<template>
  <div class="relative">
    <div v-if="props.loading" class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] ">
      <Loader />
    </div>
    <table :class="`w-full h-full ${props.loading ? ' opacity-[.5]' : ''}`">

      <thead>
        <slot name="tableHead">
          <tr>
            <th class="py-2 px-4 font-semibold text-left capitalize" v-for="(el, index) in props.headData" :key="index">
              {{ el
              }}</th>
          </tr>
        </slot>
      </thead>

      <tbody>
        <slot name="tableBody">
          <tr v-for="(el, index) in props.data" :key="index">
            <td class="px-4 w-[20px] truncate">

              <span class="truncate w-[30px]">{{ index + 1 }}</span>
            </td>
            <td class="px-4">
              <div class="chip truncate">
                <img :src="el?.image">
                <p class="max-w-[140px] truncate overflow-hidden">{{ el?.displayName }}</p>
              </div>
            </td>
            <td class="px-4 ">
              <p class="max-w-[160px] truncate overflow-hidden">
                {{ el?.email }}
              </p>
            </td>
            <td class="px-4">
              {{ formatTimestamp(Date.now()) }}
            </td>
            <td class="px-4">

              <span class="chip">
                0/10
              </span>
            </td>
            <td class="px-4">
              <label class="switch ">
                <input class="input" type="checkbox">
                <span class="slider  round"></span>
              </label>
            </td>
            <td class="px-4">
              <!--            <customButton iconColor="#34D399" icon="material-symbols:account-box" rounded  className=" hover:bg-transparent  bg-transparent"/>-->
              <customButton @handle-click="$emit('handle-read', el._id)" iconColor="#34D399"
                icon="material-symbols:visibility-rounded" rounded className=" hover:bg-transparent  bg-transparent" />
              <customButton @handle-click="$emit('handle-edit', el)" iconColor="#34D399" icon="material-symbols:edit"
                rounded className=" hover:bg-transparent  bg-transparent" />
              <customButton @handle-click="$emit('handle-delete', el._id)" :loading="props.deleting"
                icon="material-symbols:delete" rounded iconColor="red"
                className=" hover:bg-transparent  bg-transparent" />
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>

</template>
<script setup lang="ts">
import { props as tableProps } from "./props"
const props = defineProps(tableProps)

</script>

<style scoped>
.chip {
  display: inline-block;
  padding: 0 25px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  border-radius: 25px;
  background-color: #f1f1f1;

}

.chip img {
  float: left;
  margin: 0 10px 0 -25px;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

.input:checked+.slider {
  background-color: #34D399;
}

.input:focus+.slider {
  box-shadow: 0 0 1px #34D399;
}

.input:checked+.slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

tr:nth-child(even) {
  background-color: lightcyan;
}
</style>