<template >
  <div class="p-2 bg-gray-200 rounded mt-2">
    <b>Image uploader basic and auto</b>
    <div class="m-2 flex gap-1 flex-wrap">
    <image-uploader mode="basic" @handle-upload="getResponse"  />
   <image-uploader mode="basic"  auto chooseLabel="Auto Upload" @handle-upload="getResponse" />
    </div>
  </div>

  <div class="p-2 bg-gray-200 rounded mt-2">
    <b>Image uploader drag and drop </b>
    <div class="m-2 flex gap-1 flex-wrap">
      <image-uploader  name="demo[]"  @handle-upload="getResponse" :multiple="true" accept="image/*" :maxFileSize="1000000">
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </image-uploader >

    </div>

  </div>

  <div class="p-2 bg-gray-200 rounded mt-2">
    <b>Image uploader drag and drop </b>
    <div class="m-2 flex gap-1 flex-wrap">
      <image-uploader name="demo[]" @handle-upload="getResponse" :multiple="true" accept="image/*" :maxFileSize="1000000" >
        <template #header="{ choose, upload, cancel, files,uploadedCount }">
          <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
            <div class="flex gap-2">
              <Button @handle-click="choose" icon="material-symbols:image-outline-rounded" severity="primary" rounded outlined></Button>
              <Button @handle-click="uploadEvent(upload)" icon="material-symbols:upload-sharp" rounded outlined severity="success" :disabled="!files || files?.length === 0"></Button>
              <Button @handle-click="cancel" icon="material-symbols:cancel-outline" rounded outlined severity="danger" :disabled="!files || files?.length === 0"></Button>
            </div>

          </div>
        </template>
        <template #content="{ files, removeFileCallback,getImageUrl }">
          <div v-if="files?.length > 0">
            <b>Pending</b>
            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
              <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-col items-center p-2 border-[1px] border-gray-300 border-solid rounded shadow-md gap-3">
                <div>
                  <img role="presentation" :alt="file.name" :src="getImageUrl(file)" width="100" height="50" />
                </div>
                <span class="font-semibold">{{ file.name }}</span>
                <div>{{ file.size }}</div>

                <Button icon="material-symbols:close-rounded" @handle-click="removeFileCallback" outlined rounded  severity="danger" />
              </div>
            </div>
          </div>


        </template>
        <template #empty>
          <div class="flex flex-col align-items-center justify-content-center ">

          <div class="text-center">
            <Icon name="prime:cloud-upload" size="120" color="gray"/>
          </div>
          <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
          </div>
        </template>

      </image-uploader>
    </div>
  </div>

  <div  v-for="el in uploadedImages">
<!--    <img :src="el?.secure_url"/>-->
    <p>{{el}}</p>
  </div>

</template>
<script setup lang="ts">

const uploadedImages=ref([])
const getResponse=(response:[])=>{
  uploadedImages.value=response
}

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);



const uploadEvent = (callback:Function) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};




</script>