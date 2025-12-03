<script setup>
import {useItemStore} from "@/stores/itemStore";
import {onMounted, ref, watch} from "vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import IngredientOption from "@/components/IngredientOption.vue";
import {item} from "@primeuix/themes/aura/dock";
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


function callRewrite(event){
  router.back()
}

watch(() => itemStore.currentItem, (n, o) =>{
  total.value = 0;
  itemStore.totalItemCost();

  total.value = itemStore.currentItemTotal
  /*for(let i = itemStore.currentItem?.ingredients?.length - 1; i >= 0; i--){
    if(itemStore.currentItem.ingredients[i].typeId === 1){
      itemStore.currentItem.ingredients[i].choices.forEach(i => {
        if (i.current === 1){
          console.log(i.price + total.value)
          total.value += i.price
        }
      })
      if(itemStore.currentItem.ingredients[i].typeId === 2) {
        console.log(itemStore.currentItem.ingredients[i].increment.price * itemStore.currentItem.ingredients[i].increment.currentValue)
        total.value += itemStore.currentItem.ingredients[i].increment.price * itemStore.currentItem.ingredients[i].increment.currentValue

      }
    }

    console.log(total)
    total.value += itemStore.currentItem.basePrice

  }*/
}, { deep: true })

onMounted(()=> {
  itemStore.getItem(route.params.id)
  //itemStore.getCurrentIngredients(route.params.id)
  console.log(route.params.id)
  //alert()
  itemStore.dialogStatus = true

})
</script>

<template>
  <Teleport to="body">
    <Dialog v-model:visible="itemStore.dialogStatus" modal
            :header="itemStore.currentItem?.name" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
            @hide="callRewrite($event)"
    >
      <div class="p-3" style="text-align: center">
        <img :src="itemStore.currentItem?.image" alt="Sandwiches"
             style="max-width: 200px; max-height: 200px; height: auto; width: auto;
                    display: block; margin-left: auto; margin-right: auto; margin-bottom: 7px;"
        />

        <div style="font-size: 24px; font-weight: bold; margin-bottom: -10px;">
          {{ itemStore.currentItem?.name }}
        </div>
        <div class="" style="color: #777; font-weight: bold; font-size: 36px">
          $ {{ total }}.00
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
                <div class="..." v-for="ingredient in itemStore.currentItem?.ingredients">
                  <Card  unstyled class="rounded text-center"
                         style="cursor: pointer;">
                    <template #header>
                      <div class="p-3 ">
                        <img :src="ingredient?.image"  alt="Image"
                             style="max-height: 100px; max-width: 100px; height: auto; width: auto; margin-left: auto; margin-right: auto; "
                        />
                      </div>
                    </template>
                    <template #title>
                      <div class="px-3 font-bold " style="font-size: 16px;">
                        {{ ingredient?.name }}

                      </div>
                    </template>
                    <template #subtitle>

                      <div class="font-bold px-3" style="color: green; font-size: 12px">
                        {{ ingredient?.typeId === 2 ? ('$ ' + (ingredient?.increment.currentValue * (ingredient?.increment.price))) :
                          (ingredient?.choices[ingredient?.choices?.findIndex((i) => i.current === 1)].price === 0
                              ? "Free": '$ ' + (ingredient?.choices[ingredient?.choices?.findIndex((i) => i.current === 1)].price))}}


                      </div>
                    </template>
                    <template #footer>
                      <IngredientOption :ingredient="ingredient"/>
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