<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const handleSearch = () => {
    loading.value = true

    setTimeout(() => {
        loading.value = false
    }, 3000)

}
</script>
<template>
    <div class=" m-10">
        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>loading State changing on click</b>
            <div>
                <customButton @handle-click="handleSearch" :loading="loading" label="hello" />

            </div>

        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Link with severity</b>
            <div class="m-2 flex gap-1 flex-wrap">
                <customButton link severity="primary" label="Link" />
                <customButton link severity="secondary" label="Link" />
                <customButton link severity="success" label="Link" />
                <customButton link severity="danger" label="Link" />
                <customButton link severity="help" label="Link" />
                <customButton link severity="info" label="Link" />
                <customButton link severity="warning" label="Link" />
                <customButton link severity="contrast" label="Link" />
            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Default filled with diferent severity</b>

            <div class="my-2 flex gap-2 flex-wrap">
                <customButton severity="primary" label="Primary" />
                <customButton severity="secondary" label="secondary" />
                <customButton severity="success" label="success" />
                <customButton severity="danger" label="Danger" />
                <customButton severity="info" label="Info" />
                <customButton severity="warning" label="Warning" />
                <customButton severity="help" label="Help" />
                <customButton severity="contrast" label="Contrast" />
                <customButton label="Default" />

            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b> Buttons Filled with diferent severity and shadows</b>

            <div class="my-2 flex gap-2 flex-wrap">
                <customButton raised severity="primary" label="Primary" />
                <customButton raised severity="secondary" label="secondary" />
                <customButton raised severity="success" label="success" />
                <customButton raised severity="danger" label="Danger" />
                <customButton raised severity="info" label="Info" />
                <customButton raised severity="warning" label="Warning" />
                <customButton raised severity="help" label="Help" />
                <customButton raised severity="contrast" label="Contrast" />
                <customButton raised label="Default" />

            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b> Text with diferent severity and shadows</b>

            <div class="my-2 flex gap-2 flex-wrap">
                <customButton raised text severity="primary" label="Primary" />
                <customButton text severity="secondary" label="secondary" />
                <customButton text severity="success" label="success" />
                <customButton text severity="danger" label="Danger" />
                <customButton text severity="info" label="Info" />
                <customButton text severity="warning" label="Warning" />
                <customButton text severity="help" label="Help" />
                <customButton text severity="contrast" label="Contrast" />
                <customButton text label="Default" />

            </div>
        </div>
        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Text loading with diferent severity and shadows and loading true</b>

            <div class="my-2 flex gap-2 flex-wrap">
                <customButton :loading="true" raised text severity="primary" label="Primary" />
                <customButton :loading="true" text severity="secondary" label="secondary" />
                <customButton :loading="true" text severity="success" label="success" />
                <customButton :loading="true" text severity="danger" label="Danger" />
                <customButton :loading="true" text severity="info" label="Info" />
                <customButton :loading="true" text severity="warning" label="Warning" />
                <customButton :loading="true" text severity="help" label="Help" />
                <customButton :loading="true" text severity="contrast" label="Contrast" />
                <customButton :loading="true" text label="Default" />

            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Plain with diferent severity and shadows</b>

            <div class="my-2 flex gap-2 flex-wrap">
                <customButton raised plain severity="primary" label="Primary" />
                <customButton plain severity="secondary" label="secondary" />
                <customButton plain severity="success" label="success" />
                <customButton plain severity="danger" label="Danger" />
                <customButton plain severity="info" label="Info" />
                <customButton plain severity="warning" label="Warning" />
                <customButton plain severity="help" label="Help" />
                <customButton plain severity="contrast" label="Contrast" />
                <customButton plain label="Default" />

            </div>
        </div>


        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Default filled with diferent severity and loading</b>

            <div class="my-2 flex gap-2 flex-wrap">
                <customButton :loading="true" severity="primary" label="Primary" />
                <customButton :loading="true" severity="secondary" label="secondary" />
                <customButton :loading="true" severity="success" label="success" />
                <customButton :loading="true" severity="danger" label="Danger" />
                <customButton :loading="true" severity="info" label="Info" />
                <customButton :loading="true" severity="warning" label="Warning" />
                <customButton :loading="true" severity="help" label="Help" />
                <customButton :loading="true" severity="contrast" label="Contrast" />
                <customButton :loading="true" label="Default" />

            </div>
        </div>
        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Outline with diferent severity </b>

            <div class="my-2 flex gap-2 flex-wrap">
                <customButton outlined severity="primary" label="Primary" />
                <customButton outlined severity="secondary" label="secondary" />
                <customButton outlined severity="success" label="success" />
                <customButton outlined severity="danger" label="Danger" />
                <customButton outlined severity="info" label="Info" />
                <customButton outlined severity="warning" label="Warning" />
                <customButton outlined severity="help" label="Help" />
                <customButton outlined severity="contrast" label="Contrast" />
                <customButton outlined label="Default" />

            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Outline raised with diferent severity </b>
            <div class="my-2 flex gap-2 flex-wrap">
                <customButton raised outlined severity="primary" label="Primary" />
                <customButton raised outlined severity="secondary" label="secondary" />
                <customButton raised outlined severity="success" label="success" />
                <customButton raised outlined severity="danger" label="Danger" />
                <customButton raised outlined severity="info" label="Info" />
                <customButton raised outlined severity="warning" label="Warning" />
                <customButton raised outlined severity="help" label="Help" />
                <customButton raised outlined severity="contrast" label="Contrast" />
                <customButton raised outlined label="Default" />

            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>Outline raised with diferent severity raised and loading true </b>
            <div class="my-2 flex gap-2 flex-wrap">
                <customButton :loading="true" raised outlined severity="primary" />
                <customButton :loading="true" raised outlined severity="secondary" label="secondary" />
                <customButton :loading="true" raised outlined severity="success" label="success" />
                <customButton :loading="true" raised outlined severity="danger" label="Danger" />
                <customButton :loading="true" raised outlined severity="info" label="Info" />
                <customButton :loading="true" raised outlined severity="warning" label="Warning" />
                <customButton :loading="true" raised outlined severity="help" label="Help" />
                <customButton :loading="true" raised outlined severity="contrast" label="Contrast" />
                <customButton :loading="true" raised outlined label="Default" />


            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2 ">
            <b>Rounded customButtons raised with diferent severity and type</b>
            <div class="my-2 flex gap-2">
                <customButton icon="uil:twitter" raised rounded />
                <customButton icon="uil:twitter" severity="secondary" rounded />
                <customButton icon="uil:twitter" severity="success" rounded />
                <customButton icon="uil:twitter" severity="info" rounded />
                <customButton icon="uil:twitter" severity="warning" rounded />
                <customButton icon="uil:twitter" severity="help" rounded />
                <customButton icon="uil:twitter" severity="danger" rounded />
                <customButton icon="uil:twitter" severity="contrast" rounded />


            </div>


            <div class="my-2 flex gap-2">
                <customButton outlined icon="uil:twitter" raised rounded />
                <customButton outlined icon="uil:twitter" severity="secondary" rounded />
                <customButton outlined icon="uil:twitter" severity="success" rounded />
                <customButton outlined icon="uil:twitter" severity="info" rounded />
                <customButton outlined icon="uil:twitter" severity="warning" rounded />
                <customButton outlined icon="uil:twitter" severity="help" rounded />
                <customButton outlined icon="uil:twitter" severity="danger" rounded />
                <customButton outlined icon="uil:twitter" severity="contrast" rounded />


            </div>
            <div class="my-2 flex gap-2">

                <customButton raised outlined icon="uil:twitter" rounded />
                <customButton raised outlined icon="uil:twitter" severity="secondary" rounded />
                <customButton raised outlined icon="uil:twitter" severity="success" rounded />
                <customButton raised outlined icon="uil:twitter" severity="info" rounded />
                <customButton raised outlined icon="uil:twitter" severity="warning" rounded />
                <customButton raised outlined icon="uil:twitter" severity="help" rounded />
                <customButton raised outlined icon="uil:twitter" severity="danger" rounded />
                <customButton raised outlined icon="uil:twitter" severity="contrast" rounded />

            </div>
            <div class="my-2 flex gap-2">

                <customButton :loading="true" raised outlined icon="uil:twitter" rounded />
                <customButton :loading="true" raised outlined icon="uil:twitter" severity="secondary" rounded />
                <customButton :loading="true" raised outlined icon="uil:twitter" severity="success" rounded />
                <customButton :loading="true" raised outlined icon="uil:twitter" severity="info" rounded />
                <customButton :loading="true" raised outlined icon="uil:twitter" severity="warning" rounded />
                <customButton :loading="true" raised outlined icon="uil:twitter" severity="help" rounded />
                <customButton :loading="true" raised outlined icon="uil:twitter" severity="danger" rounded />
                <customButton disabled raised outlined icon="uil:twitter" severity="contrast" :loading="true" rounded />

            </div>
            <div class="my-2 flex gap-2">

                <customButton disabled raised outlined icon="uil:twitter" rounded />
                <customButton disabled raised outlined icon="uil:twitter" severity="secondary" rounded />
                <customButton disabled raised outlined icon="uil:twitter" severity="success" rounded />
                <customButton disabled raised outlined icon="uil:twitter" severity="info" rounded />
                <customButton disabled raised outlined icon="uil:twitter" severity="warning" rounded />
                <customButton disabled raised outlined icon="uil:twitter" severity="help" rounded />
                <customButton disabled raised outlined icon="uil:twitter" severity="danger" rounded />

                <customButton disabled raised outlined icon="uil:twitter" severity="contrast" rounded />

            </div>
        </div>

        <div class="p-2 bg-gray-200 rounded mt-2">
            <b>icon left and right raised with diferent severity and raised </b>
            <div class="my-2 flex gap-2 flex-wrap">
                <customButton severity="primary" label="Outline icon" iconPos="left" icon="uil:twitter" outlined />
                <customButton severity="secondary" label="Outline icon" iconPos="left" icon="uil:twitter" outlined />
                <customButton severity="success" label="Outline icon" iconPos="left" icon="uil:twitter" outlined />
                <customButton severity="help" label="Outline icon" iconPos="right" icon="uil:twitter" outlined />
                <customButton severity="danger" label="Outline icon" iconPos="right" icon="uil:twitter" outlined />
                <customButton severity="warning" label="Outline icon" iconPos="right" icon="uil:twitter" outlined />
                <customButton severity="contrast" label="Outline icon" iconPos="right" icon="uil:twitter" raised
                    outlined />
                <customButton severity="primary" label="Outline icon" iconPos="left" icon="uil:twitter" raised />
                <customButton severity="primary" label="Outline icon" iconPos="right" icon="uil:twitter" />

            </div>
        </div>

        <div class="mt-2">
            <customButton className="bg-pink-200 text-red-500 " label="Custom class applied" />
            <customButton styleName="border-radius: 50%" severity="primary" label="Disabled custom style applied"
                disabled />
        </div>




    </div>



</template>
