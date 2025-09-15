<script setup>
import {useItemStore} from "@/stores/itemStore";
import {onMounted, ref, watch} from "vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
const route = useRoute()
const itemStore = useItemStore();
const choice = ref()

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: false
  },
  data: {
    type: Object,
    required: true
  }
})
let total = ref(0);
let selectAmount = ref(0);
function pushToCart(item) {
  itemStore.pushToCart(item, total.value)
  itemStore.dialogStatus = false
  router.push("/cart")
}

function totalItemCost() {

  for(var i = itemStore.currentItem.customize?.length - 1; i >= 0; i--){
    //console.log(state.currentItem.customize[i].ingredientType)
    if(itemStore.currentItem.customize[i].ingredientType === 1){
      total = parseInt(itemStore.currentItem.customize[i].currentValue) *
          parseInt(itemStore.currentItem.customize[i].ingredientPrice)
      total += itemStore.currentItem.basePrice
    }
    if(itemStore.currentItem.customize[i].ingredientType === 2){
      total += itemStore.currentItem.customize[i].currentValue.ingredientPrice
    }

  }
}

watch(() => itemStore.currentItem, (n, o) =>{
  total.value = 0;
  for(let i = itemStore.currentItem?.customize?.length - 1; i >= 0; i--){
    //console.log(state.currentItem.customize[i].ingredientType)
    //console.log(itemStore.currentItem.customize[i].ingredientType === 1)
    if(itemStore.currentItem.customize[i].ingredientType === 1){
      total.value = parseInt(itemStore.currentItem.customize[i].currentValue) *
          parseInt(itemStore.currentItem.customize[i].ingredientPrice)
    }


    for(let i = itemStore.currentItem?.customize?.length - 1; i >= 0; i--){
      if(itemStore.currentItem.customize[i].ingredientType === 2) {
       // console.log(total.value + itemStore.currentItem.customize[i].currentValue.price)
        total.value = total.value + itemStore.currentItem.customize[i].currentValue.price
      }
    }


    total.value += itemStore.currentItem.basePrice
  }
}, { deep: true })

onMounted(()=> {
  itemStore.getItem(route.params.id)
  itemStore.getCurrentIngredients(route.params.id)
  console.log(route.params.id)
  //alert()
  itemStore.dialogStatus = true
})
</script>

<template>
  <Teleport to="body">
    <Dialog v-model:visible="itemStore.dialogStatus" modal :header="itemStore.currentItem?.Name" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="p-3" style="text-align: center">
        <img :src="itemStore.currentItem?.itemPhoto" alt="Sandwiches"
             style="max-width: 200px; max-height: 200px; height: auto; width: auto;
                    display: block; margin-left: auto; margin-right: auto; margin-bottom: 7px;"
        />
        <div style="font-size: 24px; font-weight: bold; margin-bottom: -10px;">
          {{ itemStore.currentItem?.Name }}
        </div>
        <div class="" style="color: #777; font-weight: bold; font-size: 36px">
          $ {{ itemStore.currentItem?.basePrice }}.00
        </div>
        <Button severity="success" size="lg" label="Add" class="w-100" icon="pi pi-chevron-right" iconPos="right"
                @click="pushToCart(itemStore.currentItem)"/>
      </div>
      <div >
        <Tabs value="0">
          <TabList>
            <Tab value="0">Customize</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="0">
              <div class="grid grid-cols-3 gap-4">
                <div class="..." v-for="ingredient in itemStore.currentIngredients">
                  <Card  unstyled class="rounded text-center"
                         style="cursor: pointer;">
                    <template #header>
                      <div class="p-3 ">
                        <img :src="ingredient?.IngredientPhoto"  alt="Image"
                             style="max-height: 100px; max-width: 100px; height: auto; width: auto; margin-left: auto; margin-right: auto; "
                        />
                      </div>
                    </template>
                    <template #title>
                      <div class="px-3 font-bold " style="font-size: 16px;">
                        {{ ingredient?.IngredientName }}
                      </div>
                    </template>
                    <template #subtitle>
                      <div class="font-bold px-3" style="color: green; font-size: 12px">
                        {{
                          typeof ingredient?.currentValue === "number" ?
                              ('$ ' + (parseInt(ingredient?.currentValue) * ingredient.IngredientPrice))
                              : (ingredient?.currentValue.price === 0 ? "Free": '$ ' + (ingredient?.currentValue.price))
                        }}
                      </div>
                    </template>
                    <template #footer>
                      <div class="p-3">
                        <InputNumber size="small" :defaultValue="ingredient?.currentValue" v-if="ingredient?.ingredientType === 1"
                                     inputId="horizontal-buttons" showButtons buttonLayout="horizontal"
                                     :step="1" :min="ingredient?.ingredientMinAmount"  fluid

                                     v-model="ingredient.currentValue"
                        >
                          <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                          </template>
                          <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                          </template>
                        </InputNumber>
                        <Select v-model="ingredient.currentValue" v-if="ingredient?.ingredientType === 2"
                                :options="ingredient?.ingredientChoice"
                                optionLabel="name" placeholder="Select an amount"
                                class="w-full md:w-56" size="small"/>
                      </div>
                    </template>
                  </Card>
                </div>

              </div>

            </TabPanel>

          </TabPanels>
        </Tabs>
      </div>

    </Dialog>

  </Teleport>
</template>

<style scoped>

</style>