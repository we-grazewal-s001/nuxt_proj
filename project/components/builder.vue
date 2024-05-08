<template>
    <div id="home">
        <!-- If content is true, render the Builder content using the
      Content component (previously, RenderContent) and the "page" model. -->
        <!-- <div>
            <Content model="section-model" :content="content" :apiKey="config.public.builderApiKey" />
        </div> -->
        <div v-if="content || isPreviewing()">
            <Content model="page" :apiKey="config.public.builderApiKey" :content="content"
                :customComponents="getRegisteredComponents()" />

        </div>

        <!-- If canShowContent is false, show a "Content not Found" message. -->
        <div v-else>Content not Found</div>
    </div>
</template>

<script setup>
import { Content, fetchOneEntry, isPreviewing } from "@builder.io/sdk-vue";
import { registeredComponents } from '../init-builder';
const route = useRoute();

const config = useRuntimeConfig();

const content = await fetchOneEntry({
    model: "page",
    apiKey: config.public.builderApiKey,
    userAttributes: {
        urlPath: route.path
    },

})
const getRegisteredComponents = () => {
    return registeredComponents;
}
</script>