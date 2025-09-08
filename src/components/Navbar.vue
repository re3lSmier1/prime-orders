<script setup lang="ts">
import {useItemStore} from "@/stores/itemStore.ts";
const itemStore = useItemStore();
</script>

<template>
  <Toolbar style="border: none; border-bottom: 1px solid #ededed; padding: 5px">
    <template #start>
      <div class="flex items-center gap-2">
        <div class="ps-5 font-bold">{{ this.$route.name }}</div>
      </div>
    </template>

    <template #end>
      <div class="flex items-center gap-2 pe-3">
        <!--          <i class="pi pi-cart-arrow-down" style="font-size: 1.5rem"></i>-->
        <Button icon="pi pi-cart-arrow-down" :badge="itemStore.cart.length.toString()"
                variant="text" rounded
                as="router-link" to="/cart"></Button>
        <!--          <Button asChild v-slot="slotProps"  variant="text" size="large"
                          rounded :badge="itemStore.cart.length.toString()"
                  >
                    <RouterLink to="/cart" :class="slotProps.class" >
                      <i class="pi pi-cart-arrow-down"></i>
                      <Badge value="6" severity="secondary"></Badge>
                    </RouterLink>
                  </Button>-->
      </div>
    </template>
  </Toolbar>
</template>

<style scoped>

</style>