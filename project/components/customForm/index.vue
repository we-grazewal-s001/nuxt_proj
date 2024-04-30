<template>

<form  @submit.prevent=" handleSubmit($event)">

  <div class="flex flex-col gap-2 max-w-xl m-auto">
    <slot name="header">
      <h1 class="py-2 font-semibold text-xl text-gray-500">Form Submission</h1>
    </slot>
    <slot name="body">
      <customInput />
    </slot>
    <slot name="footer">

     <div class="flex flex-col items-end ">
       <Button  :loading="props.loading"  label="Submit" type="submit"/>
     </div>
    </slot>
  </div>
</form>
</template>
<script setup>
import {props as formProp} from "./props"
const emit= defineEmits(formProp)
const props= defineProps(formProp)
function handleSubmit(e){
  console.log("Hie",e.target)
  if(props.editing){
    emit('edit-data')
  }else{
    emit('handle-submit')

  }

}
</script>