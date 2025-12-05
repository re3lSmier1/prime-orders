<script setup lang="ts">

import {useItemStore} from "@/stores/itemStore.ts";
import {onMounted} from "vue";

const itemStore = useItemStore()
const props = defineProps({
  data: {
    required: true,
  }
})

</script>

<template>
  <div class="p-3">

    <div class="flex flex-row">
      <div class="basis-1/1 " style="">
<!--                    {{ data }}-->
        <div class="flex ...">
          <div class=" shrink-0">
            <div class="p-3">
              <img :src="data?.image"
                   style="max-width: 150px; max-height: 150px; height: auto; width: auto" alt="">
            </div>
          </div>
          <div class="h-16 flex-1 ...">
            <div class="p-3 ">
              <div class="text-2xl font-bold" style="color: #555555">{{ data?.name }}</div>
              <div class="text font-bold pb-2" style="color: #444">$ {{ data?.totalCost }}.00</div>
              <div class="flex flex-row">
                <Button label="Remove" class="mr-3" size="small" severity="danger"
                        @click="itemStore.deleteFromCart(data)"/>
                <Button label="View" size="small" severity="secondary"
                        as="router-link" :to="'/cart/item/' + data?.id"/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>