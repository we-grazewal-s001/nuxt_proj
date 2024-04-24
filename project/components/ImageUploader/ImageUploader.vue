<template>

  <div>
    <input :name="props.name" @change="handleChange" ref="inputRef" type="file" class="scale-0 absolute"
           :accept="props.accept"
           :multiple="props.multiple"/>

    <div v-if="props.mode=='basic'" @click=" upload ? uploadFiles():handleChoose()">
      <Button iconPos="left" :label="upload ? image[0]?.name : props.chooseLabel" size="20"
              :icon="`${upload ? 'material-symbols:add':'material-symbols:upload-sharp'}`"/>
    </div>

    <div v-else>
      <div class="flex gap-2 py-2">
        <slot name="header" :uploadedCount="uploadedFiles" :choose="handleChoose" :upload="uploadFiles"
              :cancel="handleCancel" :files="image">

          <Button severity="primary" iconPos="left" icon="material-symbols:add" label="Choose"
                  @handle-click="handleChoose"/>
          <Button severity="primary" iconPos="left" icon="material-symbols:upload-sharp" label="Upload"
                  @handle-click="uploadFiles" :disabled="!image || image?.length === 0|| loading"/>
          <Button v-if="uploadedFiles<100" severity="primary" iconPos="left" icon="material-symbols:close-rounded"
                  label="Cancel"
                  @handle-click="handleCancel" :disabled="!image || image?.length === 0"/>

          <span v-if="image?.length" class="flex gap-2 items-center"> <span>{{ uploadedFiles }}%</span> <progress
              :value="uploadedFiles" max="100"
              style="--value: 0; --max: 100; background-color: green;border-radius: 10px"></progress></span>
        </slot>
      </div>

      <div @dragover.prevent="handleDragOver"
           @dragenter.prevent="handleDragEnter"
           @dragleave.prevent="handleDragLeave"
           @drop.prevent="handleDrop"
           :class="dropBoxClass">

        <p v-if="dragging" class="text-green-500">Drop here</p>
        <slot v-if="image?.length>0" name="content" :files="image" :removeFileCallback="deleteImage"
              :getImageUrl="getImageUrl" }>
          <div class="flex my-2 border-[1px] border-solid border-gray-400 p-2 justify-between rounded-md cursor-pointer"
               v-for="(file, index) in image" :key="index">
            <div class='flex gap-2 justify-between'>
              <img v-if="file.type.startsWith('image/')" :src="getImageUrl(file)" alt="Preview" class="w-16  rounded"/>
              <div>
                <p>{{ file.name }}</p>
                <p>{{ file.size }}</p>

              </div>
            </div>
            <Button @handle-click="deleteImage(index)" iconColor="red"
                    className="w-8 h-8 hover:bg-transparent  bg-transparent"
                    icon="material-symbols:close-rounded" rounded/>
          </div>
        </slot>
        <slot v-else name="empty">
        </slot>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {Props} from './props';
import {twMerge} from "tailwind-merge";

const props = defineProps(Props);
const image: Ref= ref([]);
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const emit = defineEmits();
const controller = new AbortController();
const loading: Ref<boolean>= ref(false)
const upload:Ref<boolean> = ref(false)
const uploadedFiles: Ref<number> = ref(0);
const dragging:Ref<boolean> = ref(false)
let abortController: AbortController | null = null;

const basicStyle = 'bg-emerald-400 hover:bg-emerald-500 p-2 rounded-md min-w-24 cursor-pointer h-10  flex items-center gap-1 text-white '

const inputClass = twMerge(` ${loading.value ? 'opacity-50' : ''} relative ${basicStyle} inline-block`.split(" "))
const dropBoxClass = computed(() => twMerge(`p-4 border-dashed border-2
${dragging.value || image.value?.length > 0 ? ' !border-emerald-500 ' : ' border-gray-400'} `.split(" ")))


const handleChoose = () => {
  if (inputRef.value) {
    inputRef.value.click();
  }
};
const deleteImage = (index: number) => {
  const newArray = Array.from(image.value);
  newArray.splice(index, 1);
  image.value = newArray;
};
function addingValueToImage(newFiles: FileList |undefined) {
  if (!newFiles) {
    return;
  }
  if (image.value) {
    const allFiles = Array.from(image.value).concat(Array.from(newFiles));
    //@ts-ignore
    const fileArray: any= allFiles.map(file => file instanceof File ? file : file instanceof Blob ? new File([file], file.name) : file);
    const newFileList = new DataTransfer();
    fileArray.forEach((file:any) => {
      newFileList.items.add(file);
    });
    image.value = newFileList.files;
  } else {
    image.value = newFiles instanceof FileList ? newFiles : new FileList();
  }
}

function handleChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const newFiles:FileList | File[] = target.files;
    addingValueToImage(newFiles)
    if (props.auto) {
      uploadFiles()
    } else {
      upload.value = true
    }
  }
};
async function uploadFiles() {
  console.log("Upload function is being called")
  abortController = new AbortController();
  const signal = abortController.signal;
  loading.value = true
  let uploadedFileCount = 0;
  try {
    const apiUrl: string = 'https://api.cloudinary.com/v1_1/hzxyensd5/image/upload';
    let secureUrls: Array<Object> = [];

    const promises = [];
    for (let i = 0; i < image.value.length; i++) {
      const file = image.value[i];

      if (file.size > props.maxFileSize) {
        loading.value = false
        alert("File Size of " + file.name + " is greater that max size")

        return
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "docs_upload_example_us_preset");

      const promise : Promise<void | 'failed'>= $fetch(apiUrl, {
        method: "POST",
        body: formData,
        signal
      }).then(async (response:any) => {
        secureUrls.push(response);
        uploadedFileCount++;
        const progress = (uploadedFileCount / image.value.length) * 100;
        // @ts-ignore
        uploadedFiles.value = +progress.toFixed(2)
      }).catch((err) => 'failed');

      promises.push(promise);
    }

    await Promise.all(promises);


    emit('handle-upload', secureUrls);
    loading.value = false
  } catch (err) {

    loading.value = false
  }
};

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  dragging.value = true;
}

function handleDragEnter(e: DragEvent) {
  e.preventDefault();
  dragging.value = true;
}

function handleDragLeave(e: DragEvent) {
  dragging.value = false;
}

const getImageUrl = (file: File) => {
  return URL.createObjectURL(file);
};

function handleDrop(e: DragEvent) {
  e.preventDefault();
  dragging.value = false;
  const newFiles:FileList|undefined = e.dataTransfer?.files;
  addingValueToImage(newFiles)
  upload.value = true;
}

function handleCancel() {

  if (abortController) {

    abortController.abort();
    abortController = null;
    loading.value = false;
  }
}
</script>

<style scoped>
.imageBg {
  position: relative;
  background-image: url("~/assets/images/image_bg.svg");
  background-repeat: no-repeat;
  background-size: contain;
  width: 120px;
  height: 120px;
  cursor: pointer;

}

.error {
  color: red;
  opacity: 0;
  animation: fadeIn;
  animation-duration: .5s;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
