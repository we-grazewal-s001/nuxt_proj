<template>
  <div class="flex max-sm:flex-col gap-2 items-baseline">
    <label class=" capitalize inline-block w-[140px]" >{{props.label}}</label>
    <input :name="props.label" :type="props.type" :required="props.required" class=" border-2 border-gray-300 w-full rounded-sm px-2 py-1 outline-gray-400 " :placeholder="props.placeholder" v-model="model"/>

  </div>
</template>
<script setup>
import {props as inputProps} from './props'
const model= defineModel()
const props= defineProps(inputProps)

</script>