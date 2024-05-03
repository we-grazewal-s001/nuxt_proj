<template>
  <div v-if="props.show" :class="defaultClass">
    <p class="capitalize">{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
import {defineProps, computed, ref, watch, defineEmits} from 'vue';
import {props as toastProps} from './props';

const props = defineProps(toastProps);
//default class computing
const defaultClass = computed(() => {
  const baseClass = 'absolute top-4 py-2 px-4 bg-white border-solid border-2 shadow-md rounded right-2 min-w-[180px] h-[60px]';
  const colorClass = props.severity === 'error' ? 'text-red-500 border-red' : 'text-blue-500 border-blue';
  return `${baseClass} ${colorClass}`;
});

const emit = defineEmits(['update-toast']);
//hiding toast and emtting a updating toast with a function in parent
onUpdated(() => {
  if (props.show) {
    setTimeout(() => {
      emit('update-toast', false);
    }, 3000);
  }
})

</script>
