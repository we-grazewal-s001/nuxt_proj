<template>
  <div class="flex max-sm:flex-col gap-2 items-baseline">
    <label class=" capitalize inline-block w-[140px]">{{ props.label }}</label>
    <div class="flex-col flex">
      <input :name="props.name" :type="props.type" :required="props.required"
        class=" border-2 border-gray-300 max-w-[360px] min-w-[240px] rounded-sm px-2 py-1 outline-gray-400 "
        :placeholder="props.placeholder" v-model="model" />
      <span class="text-red-500 text-xs error lowercase " v-if="props.error">
        {{ props.error }}
      </span>
    </div>
  </div>

</template>
<script setup lang="ts">
import { props as inputProps } from './props'
const model = defineModel()
const props = defineProps(inputProps)



</script>
<style scoped>
.error {}
</style>