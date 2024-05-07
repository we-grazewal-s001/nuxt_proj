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
        @handle-delete="handleShowDeleteBox" :loading="loading" :data="responseData" :headData="tableHeadRef" />

    </div>
    <customForm class="bg-gray-200 px-8 py-2  " @handle-close="handleHideForm" :editing="editing" @edit-data="editData"
      :loading="submitting" @handle-submit="postData" v-if="showForm">
      <template #header>

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
          <customInput :error="errors?.email?._errors[0]" name="email" type="email" v-model="values.email"
            placeholder="david@gmail.com" label="Email" />
          <!-- <div v-if="errors?.email">
            <span class="text-red-800 text-xs" v-for="error in errors?.email?._errors">{{ error }}</span>
          </div> -->
          <customInput :error="errors?.userName?._errors[0]" name="userName" v-model="values.userName"
            placeholder="David_Hemsworth_1" label="Username" />
          <customInput :error="errors?.displayName?._errors[0]" name="displayName" v-model="values.displayName"
            placeholder="David Hemsworth" label="Display name" />

          <customSelectBox :error="errors?.title?._errors[0]" name="title" v-model="values.title" label="Title"
            :options="titleOptions" />
          <customInput :error="errors?.firstName?._errors[0]" name="firstName" v-model="values.firstName"
            placeholder="David" label="First name" />
          <customInput name="middleName" v-model="values.middleName" placeholder="Middle" label="Middle name" />
          <customInput :error="errors?.lastName?._errors[0]" name="lastName" v-model="values.lastName"
            placeholder="Hemsworth" label="Last name" />

          <div class="flex flex-col">
            <div class="flex inline-block">
              <customRadioButton v-for=" el in genderOptions" :key="el.key" v-model="values.gender" :inputId="el.key"
                :name="el.name" :value="el.name" />
            </div>

            <span class="text-red-500 text-xs error" v-if="errors?.gender">
              {{ errors?.gender?._errors[0] }}
            </span>
          </div>
          <customSelectBox name="country" :error="errors?.country?._errors[0]" v-model="values.country" :options="country_list.map(country => ({
            title: country,
            value: country
          }))" label="Country" />

          <customImageUploader :existingUploadedImages="uploadedImages"
            @delete-uploaded-image="handleAfterDeleteUploadedImage" :error="errorMessage || errors?.image?._errors[0]"
            name="image" :accept="['image/jpeg', 'image/png']" :maxFileSize="80000000" @handle-upload="getResponse">
            <template #header="{ handleChoose, handleUpload, handleCancel, Allfiles, loading, validationError }">
              <div>
                <p class="text-red-500 text-xs capitalize " v-for="(el, index) in validationError" :key="index">{{ el }}
                </p>
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
          <tr class="border-2 " v-for="(key, index) in Object.keys(readableData)" :key="index">
            <th class="capitalize py-4 px-2 text-left">{{ key }} :</th>

            <td class=" max-w-[260px] truncate ">
              <a class="text-blue-500 cursor-pointer hover:underline " v-if="key == 'image'" :href="readableData[key]"
                target="_blank">{{ readableData[key] }}</a>
              <span class="capitalize" v-else> {{ readableData[key] }}</span>
            </td>

          </tr>
        </template>
      </customTable>
    </div>

    <customModel message="Are you sure you want to delete the user? You can not undo this action."
      title="Confirm Delete" @close-model="handleCloseDeleteBox" :show="showDeleteBox">
      <template #footer>
        <div class="flex p-2 gap-2 text-right">
          <customButton @handle-click="handleCloseDeleteBox" label="No,Cancel" />
          <customButton :loading="deleting" severity="danger" @handle-click="deleteDataApi" label="Yes,Delete" />
        </div>
      </template>
    </customModel>
    <customToast @update-toast="handleShowToast" :message="toastMessage" :show="showToast" />
  </div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import type { Ref } from "vue"
import { z } from "zod";
import { country_list } from "../assets/data/countryNames";
import { userSchema } from "../schemas/userZodSchema";
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

// refs for loading state starts here
const submitting = ref(false) //form Submition
const loading = ref(false) //data loading
const deleting = ref(false) // deleting data
const editing = ref(false) //editing state to toggle form create to edit

const readUser = ref(false) //to open user detail
const showDeleteBox = ref(false) //to open delete confirmationbox

const showForm = ref(false)

const errorMessage = ref("") // to set error for image uploader

// toast state and message 
const showToast = ref(false)
const toastMessage = ref("")


const deleteConfirmationId: Ref<String> = ref("") //storing id to delete a user

const responseData = ref() // table data

const titleOptions = ref([
  { title: "Mr.", value: 'Mr.' },
  { title: "Mrs.", value: 'Mrs.' },
  { title: "Miss.", value: 'Miss.' },

])

const uploadedImages: any = ref([])

const readableData = ref() // data stored to render when user clickes on eye

const genderOptions = ref([
  { name: 'Male', key: 'male' },
  { name: 'Female', key: 'female' },
  { name: 'Others', key: 'others' },
]);

// type defined for formError schema
type formSchemaErrors = z.infer<typeof userSchema>
//storing errors
const errors = ref<z.ZodFormattedError<formSchemaErrors> | null>(null)

const values = reactive({ ...initialVal }) // form values


onMounted(() => {
  // get data on first mount
  getData()
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




const handleCloseReadUser = () => {
  readUser.value = false

}

const handleShowCreateForm = () => {
  resetValues()
  uploadedImages.value = []
  showForm.value = true
  readUser.value = false
  editing.value = false
}

const handleShowEditForm = (data: any) => {

  showForm.value = true
  editing.value = true
  readUser.value = false
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

}
// reseting values on form close or toggled from edit to create
function resetValues() {
  Object.assign(values, initialVal);

}
// posting user data
async function postData() {
  submitting.value = true
  errorMessage.value = ''
  const validValues = userSchema.safeParse(values);
  if (!validValues.success) {
    submitting.value = false
    errors.value = validValues.error.format()
    return

  } else {
    errors.value = null
  }
  submitting.value = false
  let formData = { ...values, imagePublicId: uploadedImages.value[0]?.public_id }
  try {
    //@ts-ignore
    await $fetch('/api/user/create', {
      method: "POST",
      body: formData
    }).then((res: any) => {

      submitting.value = false

      if (res.error) {
        showToast.value = true
        toastMessage.value = res.error
      } else {
        //calling get data on sucessful edit of the user to fetch lastest user data
        getData()
        window.scrollTo(0, 0)
        resetValues()
        uploadedImages.value = []
        showForm.value = false

        showToast.value = true

        toastMessage.value = "User Added Successfully"
      }
    }).catch((err) => {
      toastMessage.value = "Something went wrong, try with different email or username"
      showToast.value = true
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
// delete user api call
async function deleteDataApi() {
  deleting.value = true
  showDeleteBox.value = false
  try {
    //@ts-ignore
    $fetch(`/api/user/delete/${deleteConfirmationId.value}`, {
      method: "DELETE",
    }).then((res: any) => {
      deleting.value = false
      //calling get data on sucessful edit of the user to fetch lastest user data
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

    deleting.value = false
  }
}

// Clears values in parent after image deleteing in image uploaded comp. triggered on  custom event
async function handleAfterDeleteUploadedImage() {

  values.image = ""
  values.imagePublicId = ""
  uploadedImages.value = []
  getData()

}
//edit user API 

async function editData() {

  submitting.value = true
  errorMessage.value = ''
  const validValues = userSchema.safeParse(values);
  if (!validValues.success) {
    submitting.value = false
    errors.value = validValues.error.format()
    return
  } else {
    errors.value = null
  }
  submitting.value = false

  try {
    //@ts-ignore
    $fetch(`/api/user/update/${values.id}`, {
      method: "PATCH",
      body: values
    }).then((res: any) => {
      submitting.value = false
      if (res?.error) {
        toastMessage.value = res.error
      } else {
        window.scrollTo(0, 0)
        //calling get data on sucessful edit of the user to fetch lastest user data
        getData()
        showToast.value = true
        toastMessage.value = "Edited Successfully"
      }

    }).catch((err) => {
      toastMessage.value = "Something went wrong, try with different email or username"
      submitting.value = false
    })
  } catch (err) {

    submitting.value = false
  }
}

async function getData() {
  loading.value = true
  try {
    //@ts-ignore
    $fetch('/api/user/read', {
      method: "GET",
    }).then((res: any) => {
      loading.value = false
      if (res?.error) {
      } else {
        responseData.value = res
      }

    }).catch((err) => {
      toastMessage.value = 'Something went wrong refresh and try again'
      loading.value = false
    })
  } catch (err) {
    toastMessage.value = 'Something went wrong refresh and try again'
    loading.value = false
  }

}
// api to get user by ID
async function handleReaduser(id: string) {


  showForm.value = false
  readUser.value = true
  try {
    //@ts-ignore
    $fetch(`/api/user/readById/${id}`, {
      method: "GET",
    }).then((res: any) => {
      if (res?.error) {
        toastMessage.value = 'Something went wrong refresh and try again'
      } else {
        readableData.value = res
      }
    }).catch((err) => {
      toastMessage.value = "Something went wrong, please refresh and try again"
    })
  } catch (err) {

  }
}

// for custom image uploader
const handleImageSelection = (callback: Function) => {
  if (values.image) {
    errorMessage.value = 'Please delete exisiting image to upload a new one'
    // errors?.value?.image._errors[0] = 'Please delete exisiting image to upload a new one'
    return
  };
  callback();
}
</script>