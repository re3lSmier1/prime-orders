<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {useItemStore} from "@/stores/itemStore.ts";
import {onMounted} from "vue";

import {computed} from "vue";
const route = useRoute();
const default_layout = "default";

const layout = computed(() => {
  return (route.meta.layout || default_layout) + "-layout"
  //return author.books.length > 0 ? 'Yes' : 'No'
})

const itemStore = useItemStore()

onMounted(() => {
  itemStore.getIngredientTypes()
})
</script>

<template>
  <component :is="layout">
    <RouterView :layout.sync="layout" v-slot="{Component}">
      <Transition name="page-slide" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </component>
</template>

<style scoped>

</style>
