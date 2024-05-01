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
      <customTable @handle-edit="handleShowEditForm" @handle-read="handleReaduser" :deleting="deleting" @handle-delete="deleteData" :loading="loading"
                   :data="responseData"
                   :headData="tableHeadRef"
      :isActive="isActive"/>
      </div>
    <customForm class="bg-gray-200 px-8 py-2" @handle-close="handleHideForm" :editing="editing" @edit-data="editData" :loading="submitting"
                @handle-submit="postData" v-if="showForm">
      <template #header>
        <div class="flex justify-between py-2 ">
          <h1>
            Create
          </h1>
          <div class="flex items-center gap-2">
            <Button severity="secondary" outlined iconPos="left"
                    icon="material-symbols-light:mark-chat-read-outline-sharp" label="Create & new"/>
            <Button @handle-click="handleHideForm" severity="danger" icon="material-symbols:close-rounded" outlined rounded/>
          </div>
        </div>
      </template>
      <template #body>
        <div class="flex flex-col gap-4">
          <customInput type="email" v-model="values.email" :required="true" placeholder="david@gmail.com" label="Email"/>
          <customInput v-model="values.userName" :required="true"placeholder="David_Hemsworth_1" label="Username"/>
          <customInput v-model="values.displayName" :required="true"placeholder="David Hemsworth" label="Display name"/>
          <customSelectBox v-model="values.title"  label="Title" :options="options"/>
          <customInput v-model="values.firstName" :required="true" placeholder="David" label="First name"/>
          <customInput v-model="values.middleName"  placeholder="Middle" label="Middle name"/>
          <customInput v-model="values.lastName":required="true" placeholder="Hemsworth" label="Last name"/>

          <div class="flex inline-block">
            <RadioButton v-for="el in gender"   :key="el.key" v-model="values.gender" :inputId="el.key" :name="el.name"
                         :value="el.name"/>

          </div>
          <customInput :required="true" v-model="values.country" placeholder="Country" label="Country"/>
          <imageUploader  :accept="['image/jpeg', 'image/png']" :maxFileSize="80000000" @handle-upload="getResponse"/>
          <div v-if="values.image||uploadedImages[0]?.secure_url" >
            <div class="h-12 w-14 overflow-hidden rounded shadow-md">
              <img :src="editing?values.image:uploadedImages[0]?.secure_url"/>
            </div>
          </div>
        </div>

      </template>
      <template #error >
         <span class="text-red-500 ">{{errorMessage}}</span>
      </template>
    </customForm>
    <div class="relative" v-if="readUser">
      <Button className="absolute right-2 z-[100]" @handle-click="handleCloseReadUser" outlined rounded severity="danger" icon="material-symbols:close-rounded" />
      <customTable v-if="readableData" :data="readableData">
         <template #tableHead>
           <tr   >
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
           <tr class="border-2 " v-for="key in Object.keys(readableData)" >
             <th class="capitalize py-4 px-2 text-left">{{key}} :</th>
             <td class="capitalize max-w-[360px] truncate "> {{readableData[key]}}</td>
           </tr>
        </template>
      </customTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import {country_list} from "../assets/data/countryNames";
const submitting = ref(false)
const loading = ref(false)
const deleting = ref(false)
const editing = ref(false)
const readUser=ref(false)
const tableHeadRef:string[]=['Id','Name','Email','Last Login At','Roles','Is Active','Actions']
const errorMessage= ref("")
const isActive=ref("")
const options= ref([
  {title: "Mr.", value: 'Mr.'},
  {title: "Mrs.", value: 'Mrs.'},
  {title: "Miss.", value: 'Miss.'},

])
const selectedGender = ref('Mr.')
const uploadedImages: any = ref([])
const readableData=ref()
const gender = ref([
  {name: 'Male', key: 'male'},
  {name: 'Female', key: 'female'},
  {name: 'Others', key: 'others'},
]);

type UserProfile = {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  userName: string;
  displayName: string;
  title?: string;
  image?: string;
  country: string;
  gender: "male" | "female" | "other";
};

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
  id:''
}

const values = reactive({...initialVal})

const responseData = ref()
onMounted(() => {
  getData()

})
onUpdated(()=>{
  if(errorMessage){
    setTimeout(()=>{
      errorMessage.value=""
    },3000)
  }
})

const getResponse = (response: any) => {
  values.image = response[0].secure_url
  uploadedImages.value = response
}
function capitalizeFirstLetter(string:string):string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function validateData(){
  let valid=true
  if(!values.title){
    valid=false
  errorMessage.value="Please select a title"
  }if(!values.gender){
    errorMessage.value="Please select your gender"
    valid=false
  }
  if(!values.image){
    errorMessage.value="Please add and upload the image"
    valid=false
  }

  if(!country_list.includes(capitalizeFirstLetter(values.country))){
    errorMessage.value="Please enter a valid country"
    valid=false
  }
  return valid
}
const handleCloseReadUser=()=>{
  readUser.value=false
  isActive.value=''
}
const showForm = ref(false)
const handleShowCreateForm = () => {
  resetValues()
  showForm.value = true
  isActive.value=''
  readUser.value=false
}
const handleShowEditForm = (data: any) => {
  showForm.value = true
  editing.value = true
  readUser.value=false
  isActive.value=data._id
  resetValues()
  if (data && editing.value) {
    editing.value = true;
    for(let key in values){
      //@ts-ignore
      values[key]=data[key]
    }
    values.id=data._id
  }

}
const handleHideForm = () => {
  resetValues()
  showForm.value = false
  isActive.value=''
}
function resetValues(){
  Object.assign(values, initialVal);
  // console.log(values,'after reset')
}

async function postData() {
  submitting.value = true
  if(!validateData()){
    submitting.value=false
    return
  }
  try {
    await $fetch('/api/user/create', {
      method: "POST",
      body: values
    }).then((res:any) => {
      // console.log(res)
      submitting.value = false
     if(res.error){
        errorMessage.value=res.error
     }else{
       getData()
       window.scrollTo(0,0)
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
  console.log(id)
  deleting.value = true
  try {

     $fetch(`/api/user/delete/${id}`, {
      method: "DELETE",
    }).then((res:any) => {
      console.log(res)
      deleting.value = false
      getData()
      if(id==values.id){
        resetValues()

      }
       readUser.value=false
    }).catch((err) => {
      // console.log(err)
      deleting.value = false
    })
  } catch (err) {
    // console.log(err)
    deleting.value = false
  }

}

async function editData() {
  submitting.value = true
  if(!validateData()){
    submitting.value=false
    return
  }
  try {

     $fetch(`/api/user/update/${values.id}`, {
      method: "PATCH",
      body: values
    }).then((res:any) => {
       submitting.value = false
      if(res?.error){
        errorMessage.value=res.error
      }else{
        window.scrollTo(0,0)
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
    }).then((res:any) => {
      loading.value = false

       if(res?.error){

      }else{
        responseData.value = res

      }

    }).catch((err) => {
      loading.value = false
    })
  } catch (err) {
    loading.value = false
  }

}
async function handleReaduser(id:string){
  // console.log('calling readuser')
  isActive.value=id
  showForm.value=false
  readUser.value=true
  try {
     $fetch(`/api/user/readById/${id}`, {
      method: "GET",
    }).then((res:any) => {
      if(res?.error){
        errorMessage.value=res.error
      }else{
        readableData.value=res
      }
    }).catch((err) => {
      alert("Something went wrong, please try again after refresh or later")
    })
  } catch (err) {

  }
}

</script>