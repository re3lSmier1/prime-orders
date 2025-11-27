<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {useItemStore} from "@/stores/itemStore.ts";

const itemStore = useItemStore()
const selectedIngredientChoice = ref()

const props = defineProps({
  ingredient: {
    required: true,
    default: {}
  }
})

watch(selectedIngredientChoice, (n, o) =>{

  let choices = itemStore.currentItem.ingredients[itemStore.currentItem.ingredients?.findIndex((i: any) => i.id === n.ingredientId)]
  choices.choices.forEach((choice: any, index: any) => {
    console.log(choice)
    if(n.id === choice.id){
      choice.current = 1
    }
    else{
      choice.current = 0
    }
  });
})

onMounted(() => {
  selectedIngredientChoice.value = props.ingredient.choices[props.ingredient.choices?.findIndex((i: any) => i.current === 1)]
})
</script>

<template>
  <Select v-model="selectedIngredientChoice"
          v-if="ingredient.typeId === 1"
          :options="ingredient?.choices"
          optionLabel="name" placeholder="Select an amount"
          class="w-full md:w-56" size="small"/>
</template>

<style scoped>

</style>