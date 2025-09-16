<script setup lang="ts">

import {useItemStore} from "@/stores/itemStore.ts";
import {watch} from "vue";

const itemStore = useItemStore()
const props = defineProps({
  ingredient: {
    required: true,
    default: {}
  }
})

watch(()=> props.ingredient, (n, o) => {
  alert(n)
}, { deep: true })
</script>

<template>
  <div class="p-3">
    <InputNumber size="small" :defaultValue="ingredient?.CurrentValue"
                 v-if="(itemStore.getCurrentIngredientType(ingredient.IngredientType)).Name === 'Iterative'"
                 inputId="horizontal-buttons" showButtons buttonLayout="horizontal"
                 :step="1" :min="ingredient?.IngredientMinAmount"  fluid

                 v-model="ingredient.CurrentValue"
    >
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <Select v-model="ingredient.CurrentValue" v-if="(itemStore.getCurrentIngredientType(ingredient.IngredientType)).Name === 'Choice' "
            :options="ingredient?.IngredientChoice"
            optionLabel="name" placeholder="Select an amount"
            class="w-full md:w-56" size="small"/>
  </div>
</template>

<style scoped>

</style>