<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useItemStore} from "@/stores/itemStore.ts";

const itemStore = useItemStore()

const selectedIngredientIncrement = ref();
const props = defineProps({
  ingredient: {
    required: true,
    default: {}
  }
})

watch(selectedIngredientIncrement, (n, o) => {
  console.log(n)
  let choices = itemStore.currentItem.ingredients[itemStore.currentItem.ingredients?.findIndex((i: any) => i.id === props.ingredient.id)]
  console.log(choices)
  choices.increment.currentValue = selectedIngredientIncrement.value
  itemStore.totalItemCost()
})

onMounted(() => {
  //itemStore.totalItemCost()
  console.log(props.ingredient)
  selectedIngredientIncrement.value = props.ingredient.currentValue;
})
</script>

<template>
  <InputNumber size="small" :defaultValue="ingredient?.increment.currentValue"
               inputId="horizontal-buttons" showButtons buttonLayout="horizontal"
               :step="1" :min="ingredient?.increment.minAmount"  fluid
               v-model="selectedIngredientIncrement"
  >
    <template #incrementbuttonicon>
      <span class="pi pi-plus" />
    </template>
    <template #decrementbuttonicon>
      <span class="pi pi-minus" />
    </template>
  </InputNumber>
</template>

<style scoped>

</style>