<script setup lang="ts">
import { useItemStore } from "@/stores/itemStore.ts"
import Navbar from "@/components/Navbar.vue";
import CustomizeItem from "@/components/CustomizeItem.vue";
import CartItem from "@/components/CartItem.vue";
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
      <CartItem :data="item" />
    </div>
    <div class="p-3">
      <Button variant="text" label="Add an item to the cart" as="router-link" to="/"></Button>
    </div>
    <CustomizeItem :data="itemStore.currentItem" :visible="itemStore.dialogStatus" />
  </div>
</template>

<style scoped>

</style>