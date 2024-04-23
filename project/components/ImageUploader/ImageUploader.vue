<template>


  <input @change="handleChange" ref="inputRef"  type="file" class="scale-0 absolute" accept="image/*" :multiple="props.multiple" />
  <div v-if="props.mode=='basic'" :class="` ${inputClass} `" @click=" upload ? uploadFiles():handleChoose()">
    <Icon class="mx-1" :name="`${upload?'material-symbols:add':'material-symbols:upload-sharp'}`"/>
    <span>{{upload?image[0].name:props.chooseLabel}}</span>
  </div>
  <div v-else>

    <slot name="empty">

    </slot>

    <slot name="header"/>
    <slot name="content"/>

  </div>




</template>

<script setup lang="ts">

import { Props } from './props';
import {twMerge} from "tailwind-merge";

const props = defineProps(Props);
const image: Ref<FileList | null> = ref(null);
const inputRef: Ref<HTMLInputElement | null> = ref(null);
const emit = defineEmits();
const loading= ref(false)
const upload=ref(false)

const basicStyle='bg-emerald-500 hover:bg-emerald-600 p-2 rounded-md min-w-24 cursor-pointer h-10  flex items-center gap-1 text-white '

const inputClass=twMerge(` ${loading.value?'opacity-50':''} relative ${basicStyle} inline-block`.split(" "))
const error: Ref<String | null> =ref()

const handleChoose = () => {
  if (inputRef.value) {
    inputRef.value.click();
  }
};

function handleChange(e: Event){
  const target = e.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    image.value = target.files;
    if(props.auto){
      uploadFiles()
    }else{
      upload.value=true

    }


    console.log(image.value[0].name)
  }
};


const uploadFiles = async () => {
console.log("Upload function is being called")
loading.value=true
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

    emit('handle-response',response);
    loading.value=false
  } catch (err) {
   error.value='Error uploading files!'
    loading.value=false
  }
};


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
  color:red;
  opacity: 0;
  animation: fadeIn;
  animation-duration: .5s;
  animation-fill-mode: forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
