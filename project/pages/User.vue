<template>
<div :class="` ${showForm?'flex gap-4':''} justify-between px-10  py-4 items-start w-full`">
  <div >
    <div class="flex w-full justify-between px-4 py-2">
      <h2>
        Users
      </h2>
      <Button  @handle-click="handleShowForm" severity="secondary" outlined iconPos="left" icon="material-symbols-light:mark-chat-read-outline-sharp" label="Create"/>
    </div>

    <customTable @edit-data="handleShowForm" :deleting="deleting" @handle-delete="deleteData" :loading="loading" :data="responseData" :headData="['Id','Name','Email','Last Login At','Roles','Is Active','Actions']" />
  </div>

  <customForm :editing="editing" @edit-data="editData" :loading="submitting" @handle-submit="postData" v-if="showForm">
    <template #header>
      <div class="flex justify-between py-2 ">
        <h1>
          Create
        </h1>
        <Button   severity="secondary" outlined iconPos="left" icon="material-symbols-light:mark-chat-read-outline-sharp" label="Create & new"/>
      </div>
    </template>
    <template #body>
      <div class="flex flex-col gap-4">

        <customInput v-model="values.email" placeholder="david@gmail.com" label="Email" />
        <customInput v-model="values.userName"    placeholder="David_Hemsworth_1" label="Username" />
        <customInput v-model="values.displayName" placeholder="David Hemsworth" label="Display name" />
        <customSelectBox v-model="values.title"   label="Title" :options="options" />
        <customInput v-model="values.firstName"   placeholder="First" label="First name"/>
        <customInput v-model="values.middleName"  placeholder="Middle" label="Middle name"/>
        <customInput v-model="values.lastName"  placeholder="Last" label="Last name"/>

        <div class="flex inline-block">
          <RadioButton  v-for="el in gender" :key="el.key"   v-model="values.gender" :inputId="el.key" :name="el.name"
                        :value="el.name" />

        </div>
        <customInput v-model="values.country"   placeholder="Country" label="Country"/>
        <imageUploader :accept="['image/jpeg', 'image/png']" :maxFileSize="80000000"  @handle-upload="getResponse" />
        <div v-for="el in uploadedImages ">
          <div class="h-12 w-14 overflow-hidden rounded shadow-md">
            <img :src="el.secure_url"/>
          </div>
        </div>
      </div>
    </template>

  </customForm>
</div>
</template>
<script setup lang="ts">

const submitting=ref(false)
const loading=ref(false)
const deleting= ref(false)
const editing=ref(false)
const options:Ref=ref([
  {title:"Mr.",value:'Mr.'},
  {title:"Mrs.",value:'Mrs.'},
  {title:"Miss.",value:'Miss.'},

])
const selectedGender:Ref=ref('Mr.')
const uploadedImages: any = ref([])

const gender = ref([
  { name: 'Male', key: 'male' },
  { name: 'Female', key: 'female' },
  { name: 'Others', key: 'others' },
]);

const values=reactive({
  firstName:"",
  lastName:"",
  userName:"",
  middleName:"",
  email:"",
  displayName:"",
  title:"",
  image:"",
  country:"",
  gender:""
})

const responseData=ref()
onMounted(()=>{
 getData()
})
const getResponse = (response:any) => {
  values.image=response[0].secure_url
  uploadedImages.value = response
}

const showForm=ref(false)
const handleShowForm=(data:Object)=>{
  showForm.value=!showForm.value
  if(data){
    editing.value=true
    //@ts-ignore
    for(const item in data) {
      //@ts-ignore
      values[item] = data[item]
    }
  }

}

async function postData(){
  submitting.value=true
  try {

    await $fetch('/api/user/create',{
      method:"POST",
      body:values
    }).then((res)=>{
      console.log(res)
      submitting.value=false
      getData()
    }).catch((err)=>{
      console.log(err)
      submitting.value=false
    })
  }catch(err){
    console.log(err)
    submitting.value=false
  }

}
async function deleteData(id:String){
  console.log(id)
  deleting.value=true
  try {

    await $fetch(`/api/user/delete/${id}`,{
      method:"DELETE",
    }).then((res)=>{
      console.log(res)
      deleting.value=false
      getData()
    }).catch((err)=>{
      console.log(err)
      deleting.value=false
    })
  }catch(err){
    console.log(err)
    deleting.value=false
  }

}
async function editData(id:String){
  submitting.value=true
  try {

    await $fetch(`/api/user/update/${id}`,{
      method:"PATCH",
      body:values
    }).then((res)=>{
      // console.log(res)
      submitting.value=false
      getData()
    }).catch((err)=>{
      console.log(err)
      submitting.value=false
    })
  }catch(err){
    console.log(err)
    submitting.value=false
  }

}
async function getData(){
  loading.value=true
  try {
    await $fetch('/api/user/read',{
      method:"GET",
    }).then((res)=>{
      responseData.value=res
      // setTimeout(()=>{
        loading.value=false
      // },30000)
    }).catch((err)=>{
      loading.value=false
      console.log(err)
    })
  }catch(err){
    console.log(err)
    loading.value=false
  }

}
</script>