<template>
  <div class="p-2">
    <customForm>
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

         <customInput v-model="values.email" :required="true" placeholder="david@gmail.com" label="Email" />
         <customInput v-model="values.username"  :required="true" placeholder="David_Hemsworth_1" label="Username" />
         <customInput v-model="values.displayName"  :required="true" placeholder="David Hemsworth" label="Display name" />
          <customSelectBox v-model="values.title"  :required="true" label="Title" :options="options" />
         <customInput v-model="values.firstName"  :required="true"  placeholder="First" label="First name"/>
         <customInput v-model="values.middleName" :required="true" placeholder="Middle" label="Middle name"/>
         <customInput v-model="values.lastName" :required="true"  placeholder="Last" label="Last name"/>
         <div class="flex inline-block">
           <div v-for="el in gender" :key="el.key">
             <RadioButton :required="true"  v-model="values.gender" :inputId="el.key" :name="el.name"
                          :value="el.name" />

           </div>
         </div>
         <customInput v-model="values.country"  :required="true"  placeholder="Country" label="Country"/>
         <imageUploader @handle-upload="getResponse" />


       </div>
      </template>

    </customForm>
  </div>
  <p>
    {{values}}
  </p>
</template>
<script setup lang="ts">

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
  username:"",
  middleName:"",
  email:"",
  displayName:"",
  title:"",
  image:"",
  country:"",
  gender:""
})

const getResponse = (response: []) => {
  uploadedImages.value = response
}
</script>