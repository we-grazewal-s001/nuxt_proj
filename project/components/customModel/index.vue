<template>
  <div v-if="props.show" class="bg-blend-overlay bg-opacity-50 flex flex-col items-center absolute top-0 bg-gray-300 w-full h-screen">
    <div class="bg-white m-auto max-w-[480px] min-w-[300px] rounded p-2  ">
      <slot name="head">
        <div class="flex  justify-between">
          <h2 class="font-bold text-gray-600">
            {{props.title}}
          </h2>
          <Button severity="danger"  icon="material-symbols:close-rounded"  @handle-click="$emit('close-model')" />

        </div>
      </slot>
      <slot name="body">
        <p class="px-2 py-4">
          {{props.message}}
        </p>
      </slot>
      <slot name="footer">

                <div class="flex p-2 gap-2 text-right">
                  <Button @handle-click="$emit('close-model')" label="No,Cancel" />
                  <Button @handle-click="$emit('confirm-action')"  severity="danger" label="Yes,Delete" />
                </div>

      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import {props as modelProps} from "./props"

const props=defineProps(modelProps)
</script>