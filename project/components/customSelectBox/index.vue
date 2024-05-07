<template>
  <div class="flex  items-baseline gap-2">
    <label class="w-[140px]">
      {{ props.label }}
    </label>
    <div class="flex flex-col">
      <select :required="props.required" :name="props.name" v-model="model"
        class="max-w-[360px] min-w-[240px] border-2 border-gray-300 border-solid px-2 py-1">
        <option value="">Select {{ props.label }}</option>
        <option v-for="(el, index) in props.options" :key="index" :value="el.value">{{ el.title }}</option>
      </select>
      <span class="text-red-500 text-xs error lowercase" v-if="props.error">
        {{ props.error }}
      </span>
    </div>
  </div>

</template>
<script setup lang="ts">
import { props as selectProps } from "./props"

const props = defineProps(selectProps)
const model = defineModel()

</script>