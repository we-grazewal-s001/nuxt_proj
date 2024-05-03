<template>
  <div
    :class="`${showForm || readUser ? 'flex gap-4' : ''} max-lg:flex-col justify-between px-4 py-4 w-full max-w-[1700px] m-auto`">
    <div>
      <div class="flex w-full justify-between px-4 py-2">
        <h2>
          Users
        </h2>
        <customButton @handle-click="handleShowCreateForm" severity="secondary" outlined iconPos="left"
          icon="material-symbols-light:mark-chat-read-outline-sharp" label="Create" />
      </div>
      <customTable @handle-edit="handleShowEditForm" @handle-read="handleReaduser" :deleting="deleting"
        @handle-delete="handleShowDeleteBox" :loading="loading" :data="responseData" :headData="tableHeadRef"
        :isActive="isActive" />

    </div>
    <customForm class="bg-gray-200 px-8 py-2  " @handle-close="handleHideForm" :editing="editing" @edit-data="editData"
      :loading="submitting" @handle-submit="postData" v-if="showForm">
      <template #header>
        <p class="text-red-500 font-xs">
          {{ errorMessage }}
        </p>
        <div class="flex justify-between py-2 ">

          <h1>
            {{ editing ? "Edit user " : "Create user" }}
          </h1>
          <div class="flex items-center gap-2">
            <!--            <customButton severity="secondary" outlined iconPos="left"-->
            <!--                    icon="material-symbols-light:mark-chat-read-outline-sharp" label="Create & new"/>-->
            <customButton @handle-click="handleHideForm" severity="danger" icon="material-symbols:close-rounded"
              outlined rounded />
          </div>
        </div>
      </template>
      <template #body>
        <div class="flex flex-col gap-4">
          <customInput @clear-error="handleClearFormError" :error="formError.email" name="email" type="email"
            v-model="values.email" placeholder="david@gmail.com" label="Email" />
          <customInput @clear-error="handleClearFormError" :error="formError.userName" name="userName"
            v-model="values.userName" placeholder="David_Hemsworth_1" label="Username" />
          <customInput @clear-error="handleClearFormError" :error="formError.displayName" name="displayName"
            v-model="values.displayName" placeholder="David Hemsworth" label="Display name" />

          <customSelectBox @clear-error="handleClearFormError" :error="formError.title" name="title"
            v-model="values.title" label="Title" :options="titleOptions" />
          <customInput @clear-error="handleClearFormError" :error="formError.firstName" name="firstName"
            v-model="values.firstName" placeholder="David" label="First name" />
          <customInput @clear-error="handleClearFormError" name="middleName" v-model="values.middleName"
            placeholder="Middle" label="Middle name" />
          <customInput @clear-error="handleClearFormError" :error="formError.lastName" name="lastName"
            v-model="values.lastName" placeholder="Hemsworth" label="Last name" />

          <div class="flex flex-col">
            <div class="flex inline-block">
              <customRadioButton @clear-error="handleClearFormError" :error="formError.gender"
                v-for="el in genderOptions" :key="el.key" v-model="values.gender" :inputId="el.key" :name="el.name"
                :value="el.name" />
            </div>

            <span class="text-red-500 text-xs error" v-if="formError.gender">
              Gender {{ formError.gender }}
            </span>
          </div>
          <customSelectBox @clear-error="handleClearFormError" name="country" :error="formError.country"
            v-model="values.country" :options="country_list.map(country => ({
              title: country,
              value: country
            }))" label="Country" />

          <customImageUploader :existingUploadedImages="uploadedImages"
            @delete-uploaded-image="handleAfterDeleteUploadedImage" @clear-error="handleClearFormError"
            :error="formError.image" name="image" :accept="['image/jpeg', 'image/png']" :maxFileSize="80000000"
            @handle-upload="getResponse">
            <template
              #header="{ handleChoose, handleUpload, handleCancel, uploadedFilesCount, Allfiles, loading, validationError }">
              <div>
                <p class="text-red-500 text-xs capitalize " v-for="el in validationError">{{ el }}</p>
              </div>
              <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">

                <div class="flex gap-2">
                  <customButton @handle-click="handleImageSelection(handleChoose)"
                    icon="material-symbols:image-outline-rounded" severity="primary" rounded outlined />
                  <customButton @handle-click="handleUpload" :loading="loading" icon="material-symbols:upload-sharp"
                    rounded outlined severity="success" :disabled="!Allfiles || Allfiles?.length === 0" />
                  <customButton @handle-click="handleCancel" icon="material-symbols:cancel-outline" rounded outlined
                    severity="danger" :disabled="!Allfiles || Allfiles?.length === 0" />
                </div>
              </div>
            </template>
          </customImageUploader>
        </div>
      </template>
    </customForm>
    <div class="bg-gray-200 relative p-2 rounded shadow-md" v-if="readUser">
      <customButton className="absolute right-2 z-[100]" @handle-click="handleCloseReadUser" outlined rounded
        severity="danger" icon="material-symbols:close-rounded" />
      <customTable v-if="readableData" :data="readableData">
        <template #tableHead>
          <tr>
            <td>
              <div class="overflow-hidden shadow-md flex-col items-center flex justify-center rounded-full  w-32 h-32">
                <img class="scale-150"
                  :src="readableData?.image || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'" />
              </div>
            </td>
          </tr>
        </template>
        <template #tableBody>
          <tr class="border-2 " v-for="key in Object.keys(readableData)">
            <th class="capitalize py-4 px-2 text-left">{{ key }} :</th>
            <td class="capitalize max-w-[260px] truncate "> {{ readableData[key] }}</td>
          </tr>
        </template>
      </customTable>
    </div>
    <customModel message="Are you sure you want to delete the user? You can not undo this action."
      title="Confirm Delete" @confirm-action="" @close-model="handleCloseDeleteBox" :show="showDeleteBox">
      <template #footer>
        <div class="flex p-2 gap-2 text-right">
          <customButton @handle-click="handleCloseDeleteBox" label="No,Cancel" />
          <customButton :loading="deletingUploadedImage" severity="danger" @handle-click="deleteDataApi"
            label="Yes,Delete" />
        </div>
      </template>
    </customModel>
    <customToast @update-toast="handleShowToast" :message="toastMessage" :show="showToast" />
  </div>

</template>

<script setup lang="ts">

import { country_list } from "../assets/data/countryNames";

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
  id: '',
  imagePublicId: ""
}


const submitting = ref(false)
const loading = ref(false)
const deleting = ref(false)
const editing = ref(false)

const readUser = ref(false)
const showDeleteBox = ref(false)

const deletingUploadedImage = ref(false)

const formSubmitted = ref(false)
const errorMessage = ref("")

const showToast = ref(false)
const toastMessage = ref("")

const formError = ref({ ...initialVal })
const isActive = ref("")
const deleteConfirmationId: Ref<String> = ref("")
const responseData = ref()

const titleOptions = ref([
  { title: "Mr.", value: 'Mr.' },
  { title: "Mrs.", value: 'Mrs.' },
  { title: "Miss.", value: 'Miss.' },

])
const selectedGender = ref('Mr.')
const uploadedImages: any = ref([])
const readableData = ref()
const genderOptions = ref([
  { name: 'Male', key: 'male' },
  { name: 'Female', key: 'female' },
  { name: 'Others', key: 'others' },
]);


const values = reactive({ ...initialVal })


onMounted(() => {
  getData()
})

onUpdated(() => {
  if (formError.value.gender) {
    setTimeout(() => {
      formError.value.gender = ""
    }, 8000)
  }
})

const handleShowToast = (newValue: boolean) => {
  showToast.value = newValue;
  toastMessage.value = ""
};

function handleCloseDeleteBox() {
  showDeleteBox.value = false
  deleteConfirmationId.value = ''
}

const getResponse = (response: any) => {
  values.image = response[0].secure_url
  values.imagePublicId = response[0].public_id
  uploadedImages.value = response
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function validateData() {
  let valid = true

  Object.keys(values).forEach(key => {
    //@ts-ignore
    if (!values[key] && key !== "middleName" && key !== 'id' && key !== 'imagePublicId') {
      valid = false;
      if (key == 'image') {
        //@ts-ignore
        formError.value[key] = `${splitCamelCase(key)} is required to be added and uploaded`;
      } else {
        //@ts-ignore
        formError.value[key] = `${splitCamelCase(key)} is required `;
      }

    }
  });


  return valid
}

function handleClearFormError(name: String) {
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
  uploadedImages.value = []
  formError.value = { ...initialVal }
  showForm.value = true
  isActive.value = ''
  readUser.value = false
  editing.value = false
}
const handleShowEditForm = (data: any) => {
  formError.value = { ...initialVal }
  showForm.value = true
  editing.value = true
  readUser.value = false
  isActive.value = data._id
  uploadedImages.value = []
  resetValues()
  if (data && editing.value) {
    editing.value = true;
    for (let key in values) {
      //@ts-ignore
      values[key] = data[key]
    }
    values.id = data._id
    // console.log(data)
    if (data?.image && data?.imagePublicId) {
      uploadedImages.value = [{ secure_url: data?.image, public_id: data?.imagePublicId }]
    }

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
  errorMessage.value = ""

  if (!validateData()) {
    submitting.value = false
    return
  }
  let formData = { ...values, imagePublicId: uploadedImages.value[0]?.public_id }
  try {
    await $fetch('/api/user/create', {
      method: "POST",
      body: formData
    }).then((res: any) => {
      // console.log(res)
      // formSubmitted.value=true
      submitting.value = false

      if (res.error) {
        errorMessage.value = res.error
      } else {
        getData()
        window.scrollTo(0, 0)
        resetValues()
        uploadedImages.value = []
        showForm.value = false
        showToast.value = true
        // setTimeout(()=>)
        toastMessage.value = "User Added Successfully"
      }
    }).catch((err) => {

      errorMessage.value = "Something went wrong while submitting please try again"
      submitting.value = false
    })
  } catch (err) {

    submitting.value = false
  }

}


async function handleShowDeleteBox(id: String) {
  showDeleteBox.value = true
  deleteConfirmationId.value = id
}

async function deleteDataApi() {
  deleting.value = true
  showDeleteBox.value = false
  try {
    $fetch(`/api/user/delete/${deleteConfirmationId.value}`, {
      method: "DELETE",
    }).then((res: any) => {
      deleting.value = false
      getData()
      if (deleteConfirmationId.value == values.id) {
        resetValues()
      }
      showToast.value = true
      toastMessage.value = "Deleted Successfully"
      readUser.value = false
    }).catch((err) => {

      deleting.value = false
    }).finally(() => {
      deleteConfirmationId.value = ''
      deleting.value = false
    })
  } catch (err) {
    // console.log(err)
    deleting.value = false
  }
}

async function handleAfterDeleteUploadedImage() {
  deletingUploadedImage.value = false
  values.image = ""
  values.imagePublicId = ""
  uploadedImages.value = []
  getData()

}

async function editData() {
  errorMessage.value = ""
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
        showToast.value = true
        toastMessage.value = "Edited Successfully"
      }

    }).catch((err) => {
      errorMessage.value = "Something went wrong while submitting please try again"
      submitting.value = false
    })
  } catch (err) {
    // console.log(err)
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
  errorMessage.value = ""
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
      errorMessage.value = "Something went wrong while submitting please try again"
    })
  } catch (err) {

  }
}

// for custom image uploader
const handleImageSelection = (callback: Function) => {
  if (values.image) {
    formError.value.image = "You have already selected and uploaded an image, Delete it to upload new"
    return
  }
  callback();
};
</script>