<script setup lang="ts">

import {useItemStore} from "@/stores/itemStore.ts";
import {watch} from "vue";
import IngredientSelect from "@/components/IngredientSelect.vue";
import IngredientIncrement from "@/components/IngredientIncrement.vue";

const itemStore = useItemStore()
const props = defineProps({
  ingredient: {
    required: true,
    default: {}
  }
})

watch(()=> props.ingredient, (n, o) => {
  //alert(n)
}, { deep: true })
</script>

<template>
  <div class="p-3">
    <IngredientIncrement v-if="ingredient.typeId === 2" :ingredient="ingredient" />
    <IngredientSelect v-if="ingredient.typeId === 1" :ingredient="ingredient" />
  </div>
</template>

<style scoped>

</style>