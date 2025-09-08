<script setup lang="ts">
import { useItemStore } from "@/stores/itemStore.ts"
import Navbar from "@/components/Navbar.vue";
import CustomizeItem from "@/components/CustomizeItem.vue";
  const cartStore = useItemStore()
const itemStore = useItemStore()

function SelectCartItem() {
  
}
</script>

<template>
  <div>
    <Navbar />
    <div class="p-3">
      <div>
        <h2 class="text-5xl">Cart</h2>
      </div>
    </div>
    <div v-for="item in cartStore.cart" :key="item.id">
      <div class="p-3">

        <div class="flex flex-row">
          <div class="basis-1/1 " style="">
<!--            {{ item }}-->
            <div class="flex ...">
              <div class=" shrink-0">
                <div class="p-3">
                  <img :src="item?.itemPhoto"
                       style="max-width: 150px; max-height: 150px; height: auto; width: auto" alt="">
                </div>
              </div>
              <div class="h-16 flex-1 ...">
                <div class="p-3 ">
                  <div class="text-2xl font-bold" style="color: #555555">{{ item.itemName }}</div>
                  <div class="text font-bold pb-2" style="color: #444">$ {{ item.basePrice }}.00</div>
                  <div class="flex flex-row">
                    <Button label="Remove" class="mr-3" size="small" severity="danger"
                      @click="itemStore.deleteFromCart(item)"/>
                    <Button label="View" size="small" severity="secondary"
                      @click="itemStore.showSelectItem(item)"/>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <div class="p-3">
      <Button variant="text" label="Add an item to the cart" as="router-link" to="/"></Button>
    </div>
    <CustomizeItem :data="itemStore.currentItem" :visible="itemStore.dialogStatus" />
  </div>
</template>

<style scoped>

</style>