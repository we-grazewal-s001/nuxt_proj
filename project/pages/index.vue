<template>
    <div>
        <nav class="py-4 px-2 bg-emerald-100 flex items-center ">
            <Icon name="ep:menu" />
            <b class="px-1 text-lg">Custom Components Webreinvent</b>
<!--          <loader/>-->
        </nav>
        <div class="w-[260px] h-screen overflow-scroll fixed  bg-yellow-100 flex flex-col gap-1">
            <router-link to="/button">
                <Button severity="contrast" link label="Button" />
            </router-link>
            <router-link to="/RadioButtonPage">
                <Button severity="contrast" link label="Radio Button" />
            </router-link>
            <router-link to="/ImageUploaderPage">
                <Button severity="contrast" link label="Image Uploader" />
            </router-link>
        </div>
    </div>
</template>
<script setup lang="ts">

const handleClick = (event: MouseEvent) => {
    console.log('Button Clicked', event)
}

</script>