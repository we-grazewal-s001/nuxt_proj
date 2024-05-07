<template>

  <form @submit.prevent=" handleSubmit()">

    <div class="flex flex-col gap-2 max-w-xl m-auto">
      <slot name="header">
        <h1 class="py-2 font-semibold text-xl text-gray-500">Form Submission</h1>
        <customButton @handle-click="$emit('handle-close')" outlined label="Close form" />
      </slot>
      <slot name="body">
        <customInput />
      </slot>
      <slot name="footer">
        <div class="flex flex-col items-end ">
          <customButton :loading="props.loading" label="Submit" type="submit" />
        </div>
      </slot>
      <slot name="error">
        
      </slot>
    </div>
  </form>
</template>
<script setup lang="ts">
import { props as formProp } from "./props"

const emit = defineEmits()
const props = defineProps(formProp)

function handleSubmit() {
  if (props.editing) {
    emit('edit-data')
  } else {
    emit('handle-submit')
  }
}


</script>