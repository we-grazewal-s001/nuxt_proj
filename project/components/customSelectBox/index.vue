<template>
  <div class="flex justify-between items-baseline gap-2">
    <label class="w-[140px]">
      {{props.label}}
    </label>
    <select  v-model="model" class="w-full border-2 border-gray-300 border-solid px-2 py-1" >
      <option value="">Select {{props.label}}</option>
      <option  v-for="el in props.options" :value="el.value">{{el.title}}</option>
    </select>
  </div>

</template>
<script setup>
import {props as selectProps} from "./props"
 const props= defineProps(selectProps)
const model=defineModel()
</script>