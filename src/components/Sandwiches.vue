<script setup lang="ts">
import {onMounted, readonly, ref} from "vue";
import data from "../database/items.json"
import { useItemStore } from "@/stores/itemStore";
import CustomizeItem from "@/components/CustomizeItem.vue";
import {useRouter} from "vue-router";

const router = useRouter()
const visible = ref(false)
const value = ref(0)
const choice = ref("")
const amounts = ref([
  { name: 'None', code: 'none' },
  { name: 'Regular', code: 'Regular' },
  { name: 'Extra', code: 'Extra' },
])
const itemStore = useItemStore()
const options = ref(['None', 'Regular', 'Extra']);
const items = ref(data)
const sandwichItems = ref([])

function selectItem(data: any) {
  console.log(data)
  /*itemStore.dialogStatus = true
  itemStore.currentItem = data*/
  router.push(`/sandwiches/item/${data.Id}`)
}
onMounted(()=>{
  //sandwichItems.value = itemStore.database
  itemStore.getItems()
})
</script>

<template>
  <div class="p-3">
    <div class="flex flex-row">
      <div class="basis-1/4 " v-for="item in itemStore.database" :key="item.id" style="cursor: pointer;">
        <Card  unstyled class="transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded"
          @click="selectItem(item)" >
          <template #header>
            <div class="p-3">
              <Image :src="item.itemPhoto" alt="Image"  />
            </div>
          </template>
          <template #title>
              <div class="px-3 font-bold " style="font-size: 24px;">
                {{ item.Name }}
              </div>
            </template>
            <template #subtitle>
              <div class="font-bold px-3" style="color: #555; font-size: 18px">$ {{ item.basePrice }}.00</div>
          </template>

        </Card>
      </div>
    </div>
<!--    <CustomizeItem :data="itemStore.currentItem" :visible="itemStore.dialogStatus" />-->
    <RouterView />
  </div>
</template>

<style scoped>

</style>