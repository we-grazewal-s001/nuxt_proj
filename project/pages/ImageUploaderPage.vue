<template >
  <div class="p-2 bg-gray-200 rounded mt-2">
    <b>Image uploader basic and auto</b>
    <div class="m-2 flex gap-1 flex-wrap">
    <image-uploader mode="basic" @handle-response="getResponse"  url="https://uploadcare.com/docs/uploads/"/>
   <image-uploader mode="basic"  auto chooseLabel="Auto Upload" @handle-response="getResponse"  url="https://uploadcare.com/docs/uploads/"/>
    </div>
  </div>

  <div class="p-2 bg-gray-200 rounded mt-2">
    <b>Image uploader drag and drop </b>
    <div class="m-2 flex gap-1 flex-wrap">
      <image-uploader  name="demo[]" url="/api/upload" @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </image-uploader >
    </div>
  </div>
</template>
<script setup lang="ts">
const getResponse=(response:Promise<T>)=>{
  console.log(response)
}
</script>