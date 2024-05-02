<template>
  <div :class="`${showForm || readUser?'flex gap-4':''} justify-center py-4 w-full`">
    <div>
      <div class="flex w-full justify-between px-4 py-2">
        <h2>
          Users
        </h2>
        <Button @handle-click="handleShowCreateForm" severity="secondary" outlined iconPos="left"
                icon="material-symbols-light:mark-chat-read-outline-sharp" label="Create"/>
      </div>
      <customTable @handle-edit="handleShowEditForm" @handle-read="handleReaduser" :deleting="deleting"
                   @handle-delete="deleteData" :loading="loading"
                   :data="responseData"
                   :headData="tableHeadRef"
                   :isActive="isActive"/>
    </div>
    <customForm class="bg-gray-200 px-8 py-2" @handle-close="handleHideForm" :editing="editing" @edit-data="editData"
                :loading="submitting"
                @handle-submit="postData" v-if="showForm">
      <template #header>
        <div class="flex justify-between py-2 ">
          <h1>
            Create
          </h1>
          <div class="flex items-center gap-2">
            <!--            <Button severity="secondary" outlined iconPos="left"-->
            <!--                    icon="material-symbols-light:mark-chat-read-outline-sharp" label="Create & new"/>-->
            <Button @handle-click="handleHideForm" severity="danger" icon="material-symbols:close-rounded" outlined
                    rounded/>
          </div>
        </div>
      </template>
      <template #body>
        <div class="flex flex-col gap-4">
          <customInput @clear-error="handleClearFormError" :error="formError.email" name="email" type="email"
                       v-model="values.email" placeholder="david@gmail.com" label="Email"/>
          <customInput @clear-error="handleClearFormError" :error="formError.userName" name="userName"
                       v-model="values.userName" placeholder="David_Hemsworth_1" label="Username"/>
          <customInput @clear-error="handleClearFormError" :error="formError.displayName" name="displayName"
                       v-model="values.displayName" placeholder="David Hemsworth" label="Display name"/>

          <customSelectBox @clear-error="handleClearFormError" :error="formError.title" name="title"
                           v-model="values.title" label="Title" :options="options"/>
          <customInput @clear-error="handleClearFormError" :error="formError.firstName" name="firstName"
                       v-model="values.firstName" placeholder="David" label="First name"/>
          <customInput @clear-error="handleClearFormError" name="middleName" v-model="values.middleName"
                       placeholder="Middle" label="Middle name"/>
          <customInput @clear-error="handleClearFormError" :error="formError.lastName" name="lastName"
                       v-model="values.lastName" placeholder="Hemsworth" label="Last name"/>

         <div class="flex flex-col">
           <div class="flex inline-block">
             <RadioButton @clear-error="handleClearFormError" :error="formError.gender" v-for="el in gender"
                          :key="el.key" v-model="values.gender" :inputId="el.key" :name="el.name"
                          :value="el.name"/>
           </div>

             <span  class="text-red-500 text-xs error" v-if="formError.gender">
           Gender {{formError.gender}}
        </span>
         </div>
          <customSelectBox @clear-error="handleClearFormError" name="country" :error="formError.country"
                           v-model="values.country" :options="country_list.map(country => ({
          title: country,
          value: country
      }))" label="Country"/>

          <image-uploader @clear-error="handleClearFormError" :error="formError.image" name="image" :accept="['image/jpeg', 'image/png']" :maxFileSize="80000000" @handle-upload="getResponse">
            <template
                #header="{ handleChoose, handleUpload, handleCancel, uploadedFiles,Allfiles ,loading,validationError}">
              <div>
                <p class="text-red-500 " v-for="el in validationError">{{ el }}</p>
              </div>
              <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">

                <div class="flex gap-2">
                  <Button @handle-click="handleImageSelection(handleChoose)" icon="material-symbols:image-outline-rounded" severity="primary"
                          rounded outlined></Button>
                  <Button @handle-click="handleUpload" :loading="loading" icon="material-symbols:upload-sharp"
                          rounded outlined severity="success" :disabled="!Allfiles || Allfiles?.length === 0"></Button>
                  <Button @handle-click="handleCancel" icon="material-symbols:cancel-outline" rounded outlined
                          severity="danger" :disabled="!Allfiles || Allfiles?.length === 0"></Button>
                </div>
              </div>
              <div class="flex items-center">
                <p v-if="loading">Upoading...</p>
                <span v-if="Allfiles?.length" class="flex gap-2 items-center"> <span>{{ uploadedFiles }}%</span> <progress
                    :value="uploadedFiles" max="100"
                    style="--value: 0; --max: 100; background-color: green;border-radius: 10px"></progress></span>
              </div>
            </template>

            <template #content="{ files, removeFileCallback,getImageUrl,loading }">
              <div v-if="files?.length > 0">
                <b>Pending</b>
                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                  <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                       class="card m-0 px-6 flex flex-col items-center p-2 border-[1px] border-gray-300 border-solid rounded shadow-md gap-3">
                    <div>
                      <img role="presentation" :alt="file.name" :src="getImageUrl(file)" width="100" height="50"/>
                    </div>
                    <span class="font-semibold">{{ file?.name }}</span>
                    <div>{{ file?.size }}</div>

                    <Button :disabled="loading" icon="material-symbols:close-rounded" @handle-click="removeFileCallback"
                            outlined rounded severity="danger"/>
                  </div>
                </div>
              </div>
              <div v-else-if="uploadedImages">
                  <img :src="uploadedImages.secure_url" />
              </div>
            </template>

            <template #empty>
              <div class="flex flex-col align-center items-center justify-content-center ">
                <div class="text-center">
                  <Icon name="prime:cloud-upload" size="120" color="gray"/>
                </div>

                <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
              </div>
            </template>
          </image-uploader>

<!--          <imageUploader @clear-error="handleClearFormError" :error="formError.image"-->
<!--                         :accept="['image/jpeg', 'image/png']" :maxFileSize="80000000" @handle-upload="getResponse"/>-->

          <div v-if="values.image">
            <div class="h-12 w-14 overflow-hidden rounded shadow-md">
              <img :src="values.image"/>
            </div>
          </div>
        </div>

      </template>
<!--      <template #error>-->
<!--        <span class="text-red-500 ">{{ errorMessage }}</span>-->
<!--      </template>-->
    </customForm>
    <div class="relative" v-if="readUser">
      <Button className="absolute right-2 z-[100]" @handle-click="handleCloseReadUser" outlined rounded
              severity="danger" icon="material-symbols:close-rounded"/>
      <customTable v-if="readableData" :data="readableData">
        <template #tableHead>
          <tr>
            <td>
              <div class="flex my-2 !justify-between items-center">
                <div class="overflow-hidden flex-col items-center flex justify-center rounded-full  w-32 h-32">
                  <img class="scale-150" :src="readableData?.image"/>
                </div>
              </div>
            </td>
          </tr>
        </template>
        <template #tableBody>
          <tr class="border-2 " v-for="key in Object.keys(readableData)">
            <th class="capitalize py-4 px-2 text-left">{{ key }} :</th>
            <td class="capitalize max-w-[360px] truncate "> {{ readableData[key] }}</td>
          </tr>
        </template>
      </customTable>
    </div>
    <customModel message="Are you sure you want to delete the user? You can not undo this action."
                 title="Confirm Delete" @confirm-action="" @close-model="handleCloseDeleteBox" :show="showDeleteBox">
      <template #footer>
        <div class="flex p-2 gap-2 text-right">
          <Button @handle-click="handleCloseDeleteBox" label="No,Cancel"/>
          <Button severity="danger" @handle-click="deleteDataApi" label="Yes,Delete"/>
        </div>
      </template>
    </customModel>
  </div>

</template>

<script setup lang="ts">

import {country_list} from "../assets/data/countryNames";

const tableHeadRef: string[] = ['Id', 'Name', 'Email', 'Last Login At', 'Roles', 'Is Active', 'Actions']
const initialVal = {
  firstName: "",
  lastName: "",
  userName: "",
  middleName: "",
  email: "",
  displayName: "",
  title: "",
  image: "",
  country: "",
  gender: "",
  id: ''
}


const submitting = ref(false)
const loading = ref(false)
const deleting = ref(false)
const editing = ref(false)
const readUser = ref(false)
const errorMessage = ref("")
const formError = ref({...initialVal})
const isActive = ref("")
const deleteConfirmationId: Ref<String> = ref("")
const showDeleteBox = ref(false)
const responseData = ref()

const options = ref([
  {title: "Mr.", value: 'Mr.'},
  {title: "Mrs.", value: 'Mrs.'},
  {title: "Miss.", value: 'Miss.'},

])
const selectedGender = ref('Mr.')
const uploadedImages: any = ref([])
const readableData = ref()
const gender = ref([
  {name: 'Male', key: 'male'},
  {name: 'Female', key: 'female'},
  {name: 'Others', key: 'others'},
]);


const values = reactive({...initialVal})


onMounted(() => {
  getData()

})
onUpdated(()=>{
  if(formError.value.gender){
    setTimeout(()=>{
      formError.value.gender=""
    },3000)
  }
})

function handleCloseDeleteBox() {
  showDeleteBox.value = false
  deleteConfirmationId.value = ''
}

const getResponse = (response: any) => {
  values.image = response[0].secure_url
  uploadedImages.value = response
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function validateData() {
  let valid = true

  for (let key in values) {
    //@ts-ignore
    if (!values[key] && key!="middleName" && key!=='id') {
       valid = false
      //@ts-ignore
      formError.value[key] = splitCamelCase(key)+" is required to added and uploaded"
    }
  }
  console.log(formError)


  // if(!values.title){
  //   valid=false
  //
  //   FormError.value.title="Please select a title"
  // }if(!values.gender){
  //   FormError.value.gender="Please select your gender"
  //   valid=false
  // }
  // if(!values.image){
  //   FormError.value.image="Please add and upload the image"
  //   valid=false
  // }
  //
  // if(!country_list.includes(capitalizeFirstLetter(values.country))){
  //   FormError.value.country="Please enter a valid country"
  //   valid=false
  // }
  return valid
}

function handleClearFormError(name: String) {
  console.log(name)
  //@ts-ignore
  formError.value[name] = ""
}

const handleCloseReadUser = () => {
  readUser.value = false
  isActive.value = ''
}
const showForm = ref(false)
const handleShowCreateForm = () => {
  resetValues()
  showForm.value = true
  isActive.value = ''
  readUser.value = false
  editing.value = false
}
const handleShowEditForm = (data: any) => {
  showForm.value = true
  editing.value = true
  readUser.value = false
  isActive.value = data._id
  resetValues()
  if (data && editing.value) {
    editing.value = true;
    for (let key in values) {
      //@ts-ignore
      values[key] = data[key]
    }
    values.id = data._id
  }

}
const handleHideForm = () => {
  resetValues()
  showForm.value = false
  isActive.value = ''
}

function resetValues() {
  Object.assign(values, initialVal);
  // console.log(values,'after reset')
}

async function postData() {
  submitting.value = true
  if (!validateData()) {
    submitting.value = false
    return
  }
  try {
    await $fetch('/api/user/create', {
      method: "POST",
      body: values
    }).then((res: any) => {
      // console.log(res)
      submitting.value = false
      if (res.error) {
        errorMessage.value = res.error
      } else {
        getData()
        window.scrollTo(0, 0)
        resetValues()
      }
    }).catch((err) => {
      // console.log(err)
      submitting.value = false
    })
  } catch (err) {
    // console.log(err)
    submitting.value = false
  }

}


async function deleteData(id: String) {

  showDeleteBox.value = true

  deleteConfirmationId.value = id
  // deleteDataApi(id)

}

async function deleteDataApi() {
  deleting.value = true
  showDeleteBox.value = false
  try {
    $fetch(`/api/user/delete/${deleteConfirmationId.value}`, {
      method: "DELETE",
    }).then((res: any) => {
      // console.log(res)
      deleting.value = false
      getData()
      if (deleteConfirmationId.value == values.id) {
        resetValues()
      }
      readUser.value = false
    }).catch((err) => {
      deleting.value = false
    }).finally(() => {
      deleteConfirmationId.value = ''
    })
  } catch (err) {
    // console.log(err)
    deleting.value = false
  }
}

async function editData() {
  submitting.value = true
  if (!validateData()) {
    submitting.value = false
    return
  }
  try {

    $fetch(`/api/user/update/${values.id}`, {
      method: "PATCH",
      body: values
    }).then((res: any) => {
      submitting.value = false
      if (res?.error) {
        errorMessage.value = res.error
      } else {
        window.scrollTo(0, 0)
        getData()
      }

    }).catch((err) => {
      console.log(err)
      submitting.value = false
    })
  } catch (err) {
    console.log(err)
    submitting.value = false
  }

}

async function getData() {
  loading.value = true
  try {
    $fetch('/api/user/read', {
      method: "GET",
    }).then((res: any) => {
      loading.value = false
      if (res?.error) {
      } else {
        responseData.value = res
      }

    }).catch((err) => {
      loading.value = false
    })
  } catch (err) {
    loading.value = false
  }

}

async function handleReaduser(id: string) {
  // console.log('calling readuser')
  isActive.value = id
  showForm.value = false
  readUser.value = true
  try {
    $fetch(`/api/user/readById/${id}`, {
      method: "GET",
    }).then((res: any) => {
      if (res?.error) {
        errorMessage.value = res.error
      } else {
        readableData.value = res
      }
    }).catch((err) => {
      alert("Something went wrong, please try again after refresh or later")
    })
  } catch (err) {

  }
}
// for custom image uploader
const handleImageSelection = (callback: Function) => {
 if(values.image){
   formError.value.image="You have already selected and uploaded an image, Delete it to upload new"
   return
 }
  callback();
};
</script>