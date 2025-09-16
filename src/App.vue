<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

import {useItemStore} from "@/stores/itemStore.ts";
import {onMounted} from "vue";

const itemStore = useItemStore()

onMounted(() => {
  itemStore.getIngredientTypes()
})
</script>

<template>


  <RouterView />
</template>

<style scoped>

</style>
