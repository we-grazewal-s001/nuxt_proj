<template>

  <div>
    <input :name="props.name" @change="handleChange" ref="inputRef" type="file" class="scale-0"
           :accept="props.accept.join(',')"
           :multiple="props.multiple"/>


    <div v-if="props.mode=='basic'" @click="upload ? uploadFiles():handleChoose()">
      <div>
        <p class="text-red-500 " v-for="el in invalidError">{{ el }}</p>
      </div>
      <Button iconPos="left" :loading="loading" :label=" image[0]?image[0].name : props.chooseLabel" size="20"
              :icon="`${upload ? 'material-symbols:add':'material-symbols:upload-sharp'}`"/>
    </div>

    <div v-else>

      <div class="flex flex-col gap-2 py-2">
        <slot name="header" :validationError="invalidError" :uploadedFiles="uploadedFiles" :handleChoose="handleChoose"
              :handleUpload="uploadFiles"
              :handleCancel="handleCancel" :Allfiles="image" :loading="loading">
          <div>
            <p class="text-red-500 " v-for="el in invalidError">{{ el }}</p>
          </div>

          <div class="flex gap-2 py-2">
            <Button severity="primary" iconPos="left" icon="material-symbols:add" label="Choose"
                    @handle-click="handleChoose"/>
            <Button :loading="loading" severity="primary" iconPos="left" icon="material-symbols:upload-sharp"
                    label="Upload"
                    @handle-click="uploadFiles" :disabled="!image || image?.length === 0"/>
            <Button v-if="uploadedFiles<100" severity="primary" iconPos="left" icon="material-symbols:close-rounded"
                    label="Cancel"
                    @handle-click="handleCancel" :disabled="!image || image?.length === 0"/>

            <span v-if="image?.length" class="flex gap-2 items-center"> <span>{{ uploadedFiles }}%</span> <progress
                :value="uploadedFiles" max="100"
                style="--value: 0; --max: 100; background-color: green;border-radius: 10px"></progress></span>
          </div>
        </slot>
      </div>

      <div @dragover.prevent="handleDragOver"
           @dragenter.prevent="handleDragEnter"
           @dragleave.prevent="handleDragLeave"
           @drop.prevent="handleDrop"
           :class="dropBoxClass">
        <p @hover.prevent="" v-if="dragging" class="text-green-500">Drop here</p>
        <slot v-if="image?.length>0" name="content" :files="image" :removeFileCallback="deleteImage"
              :getImageUrl="getImageUrl" :loading="loading" }>
          <div class="flex my-2 border-[1px] border-solid border-gray-400 p-2 justify-between rounded-md cursor-pointer"
               v-for="(file, index) in image" :key="index">
            <div class='flex gap-2 justify-between'>
              <img @hover.prevent="" v-if="file.type.startsWith('image/')" :src="getImageUrl(file)" alt="Preview"
                   class="w-16  rounded"/>
              <div>
                <p class="capitalize">{{ file.name }}</p>
                <p>{{ bytesToMegabytes(file.size) }} MB </p>
              </div>
            </div>
            <Button :disabled="loading" @handle-click="deleteImage(index)" iconColor="red"
                    className="w-8 h-8 hover:bg-transparent  bg-transparent"
                    icon="material-symbols:close-rounded" rounded/>
          </div>
        </slot>
        <slot v-else name="empty">
          <div class="flex flex-col align-center items-center justify-content-center ">
            <div class="text-center">

              <img class="text-center" src="~/assets/images/image_bg.svg"/>
            </div>

            <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
          </div>
        </slot>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { Props} from './props';
import {twMerge} from "tailwind-merge";
import {bytesToMegabytes} from "../../composables/useBytesToMegaBytes";
import {getImageUrl} from "../../composables/useGetImageBlobURL";


const props = defineProps(Props);
const image: Ref = ref([]);
const inputRef: Ref = ref(null);
const emit = defineEmits();
const invalidError: Ref = ref([])
const controller = new AbortController();
const loading = ref(false)
const upload = ref(false)
const uploadedFiles = ref(0);
const dragging = ref(false)
//to cancel the api request
let abortController: AbortController | null = null;

//to remove errors caused by invalid inputs after 4 seconds
onUpdated(() => {
  if (invalidError.value.length > 0) {
    setTimeout(() => {
      invalidError.value = []
    }, 4000)
  }
})

const dropBoxClass = computed(() => twMerge(`p-4 border-dashed border-2
${dragging.value || image.value?.length > 0 ? ' !border-emerald-500 ' : ' border-gray-400'} ${loading.value ? 'cursor-not-allowed' : 'cursor-pointer'} `.split(" ")))

//to trigger click event on the input

const handleChoose = () => {
  if (inputRef.value) {
    inputRef.value.click();
  }
};

// to validate size and type of the input
function validateInput(file: File) {
  let validate = true

  let allowedTypes= props.accept
  //@ts-ignore
  if (!allowedTypes.includes(file.type)) {
    loading.value = false
    invalidError.value.push(`Invalid file type of ${file.name}. Please upload ${props.accept.join(', ').split('/').join(' ')}.`)
    validate = false
  }
  if (file.size > props.maxFileSize) {
    loading.value = false
    invalidError.value.push(`File Size of ${file.name} is greater that max size ${bytesToMegabytes(+props.maxFileSize)} MB`)
    validate = false
  }
  return validate
}

//to add images after selection from the input box
function addingValueToImage(newFiles: any) {
  if (!newFiles) {
    return;
  }
  if (image.value) {
    //@ts-ignore
    const allFiles = Array.from(image.value).concat(Array.from(newFiles));
    //@ts-ignore
    const fileArray: any = allFiles.map(file => file instanceof File ? file : file instanceof Blob ? new File([file], file.name) : file);
    const newFileList = new DataTransfer();
    fileArray.forEach((file: any) => {
      newFileList.items.add(file);
    });
    image.value = newFileList.files;
  } else {
    image.value = newFiles instanceof FileList ? newFiles : new FileList();
  }
}

// to delete image that is added by choosing before uploading
const deleteImage = (index: number) => {
  const newArray = Array.from(image.value);
  newArray.splice(index, 1);
  image.value = newArray;
  uploadedFiles.value = 0
};

// this function is being triggered when input is being clicked after handleClick function
async function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  console.log(e.target, 'log 1')
  if (target.files && target.files.length > 0) {
    const newFiles: FileList | File[] = target.files;
    let arr: File[] = []
    invalidError.value = []
    console.log(newFiles, 'log 2')
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (validateInput(file)) {
        arr.push(file)
      }
    }
    addingValueToImage(arr)
    if (props.auto) {
      uploadFiles()
    } else {
      upload.value = true
    }
  }
};

// api is being called after button click
async function uploadFiles() {
  abortController = new AbortController();
  const signal = abortController.signal;
  loading.value = true
  let uploadedFileCount = 0;
  try {
    const apiUrl: string = '/api/cloudinary';
    let Allresponse: Array<Object> = [];
    const promises = [];
    for (let i = 0; i < image.value.length; i++) {
      const file = image.value[i];
      const formData = new FormData();
      formData.append("file", file);
      const promise: Promise<void | 'failed'> = $fetch(apiUrl, {
        method: "POST",
        body: formData,
        signal
      }).then(async (response: any) => {
        Allresponse.push(response);
        uploadedFileCount++;
        const progress = (uploadedFileCount / image.value.length) * 100;
        // @ts-ignore
        uploadedFiles.value = +progress.toFixed(2)
      }).catch((err) => 'failed');
      promises.push(promise);
    }
    await Promise.all(promises);
    emit('handle-upload', Allresponse);
    image.value = []
    loading.value = false
    upload.value = false
    uploadedFiles.value = 0
  } catch (err) {
    loading.value = false
  }
};

// to handle dragging over effects
function handleDragOver(e: DragEvent) {
  e.preventDefault()
  if (!loading.value) {
    dragging.value = true;
  }
}

// to handle ever effects
function handleDragEnter(e: DragEvent) {
  e.preventDefault();
  if (!loading.value) {
    dragging.value = true;
  }
}

//to add drag leave effects
function handleDragLeave(e: DragEvent) {
  if (!loading.value) {
    dragging.value = false;
  }
}

// to handle drop files on the box
function handleDrop(e: DragEvent) {
  e.preventDefault();
  if (!loading.value && e?.dataTransfer?.files) {
    dragging.value = false;
    //@ts-ignore
    const newFiles: FileList | File[] = e.dataTransfer.files;
    invalidError.value = []
    let arr: File[] = []
    // to validate each file but filter valid files
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i];
      if (validateInput(file)) {
        arr.push(file)
      }
    }
    // add all dragged files on in the image ref by calling addingValueToImage function
    addingValueToImage(arr)
    upload.value = true;
  }
}

// to cancel the api request in between
function handleCancel() {
  if (abortController) {
    abortController.abort();
    abortController = null;
    loading.value = false;
  }
}
</script>

<style scoped>
/**/
</style>
