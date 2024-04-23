<template>


  <input @change="handleChange" ref="inputRef" type="file" class="scale-0 absolute" accept="image/*"
         :multiple="props.multiple"/>
  <div v-if="props.mode=='basic'" :class="` ${inputClass} `" @click=" upload ? uploadFiles():handleChoose()">
    <Icon size="20" class="mx-1" :name="`${upload?'material-symbols:add':'material-symbols:upload-sharp'}`"/>
    <span>{{ upload ? image[0].name : props.chooseLabel }}</span>
  </div>
  <div v-else>
    <div class="flex gap-2 py-2">
      <slot name="header">
        <Button severity="primary" iconPos="left" icon="material-symbols:add" label="Choose"
                @handle-click="handleChoose"/>
        <Button severity="primary" iconPos="left" icon="material-symbols:upload-sharp" label="Upload"
                @handle-click="uploadFiles"/>
        <Button severity="primary" iconPos="left" icon="material-symbols:close-rounded" label="Cancel"
                @handle-click="handleCancel"/>
      </slot>
    </div>

    <div @dragover.prevent="handleDragOver"
         @dragenter.prevent="handleDragEnter"
         @dragleave.prevent="handleDragLeave"
         @drop.prevent="handleDrop"
         :class="dropBoxClass">
      <slot v-if="image?.length>0" name="content">
        <div class="flex my-2 border-[1px] border-solid border-gray-400 p-2 rounded-md cursor-pointer"
             v-for="(file, index) in image" :key="index">
          <div class='flex gap-2 justify-between'>
            <img v-if="file.type.startsWith('image/')" :src="getImageUrl(file)" alt="Preview" class="w-16  rounded"/>
            <div>
              <p>{{ file.name }}</p>
              <p>{{ file.size }}</p>
            </div>
          </div>
          <Button @handle-click="deleteImage(index)" iconColor="red" className="w-8 h-8 hover:bg-transparent"
                  icon="material-symbols:close-rounded" rounded/>
        </div>
      </slot>
      <slot v-else name="empty">
      </slot>
    </div>
  </div>

</template>

<script setup lang="ts">

import {Props} from './props';
import {twMerge} from "tailwind-merge";

const props = defineProps(Props);
const image: Ref<FileList | null> = ref(null);
const imageUrl = ref(null)
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const emit = defineEmits();
const loading = ref(false)
const upload = ref(false)

const dragging = ref(false)


const basicStyle = 'bg-emerald-400 hover:bg-emerald-500 p-2 rounded-md min-w-24 cursor-pointer h-10  flex items-center gap-1 text-white '


const inputClass = twMerge(` ${loading.value ? 'opacity-50' : ''} relative ${basicStyle} inline-block`.split(" "))
const dropBoxClass = computed(() => twMerge(`p-4 border-dashed border-2
${dragging.value || image.value?.length > 0 ? ' !border-emerald-500 ' : ' border-gray-400'} `.split(" ")))
const error: Ref<String | null> = ref()

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

function handleChange(e: Event) {

  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const newFiles = target.files;
    if (image.value) {
      const allFiles = Array.from(image.value).concat(Array.from(newFiles));

      const fileArray: File[] = allFiles.map(file => file instanceof File ? file : file instanceof Blob ? new File([file], file.name) : file);
      const newFileList = new DataTransfer();
      fileArray.forEach(file => {
        newFileList.items.add(file);
      });

      image.value = newFileList.files;
    } else {
     
      image.value = target.files;
    }


    if (props.auto) {
      uploadFiles()
    } else {
      upload.value = true
    }
  }
};


async function uploadFiles() {
  console.log("Upload function is being called")
  loading.value = true
  try {
    const apiUrl: string = props.url;
    const formData = new FormData();

    Array.from(image.value).forEach((file, index) => {
      formData.append(`file_${index}`, file);
    });
    const response = await $fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    emit('handle-response', response);
    loading.value = false
  } catch (err) {
    error.value = 'Error uploading files!'
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
  console.log(e.target, 'link')
  dragging.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    image.value = files;
    upload.value = true;
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
