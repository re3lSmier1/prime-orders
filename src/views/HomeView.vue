<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import router from "@/router";
import {useItemStore} from "@/stores/itemStore.ts";
import Navbar from "@/components/Navbar.vue";
import {useRoute} from "vue-router";
const route = useRoute();
const itemStore = useItemStore();

watch(() => route.params.categoryId, (newId, oldId) => {
  // Perform actions when the 'id' parameter changes
  /*console.log(`User ID changed from ${oldId} to ${newId}`);
  alert()*/
  itemStore.getItemsByCategories(route.params.categoryId,1)
  // e.g., fetch new data based on newId
}, { deep: true });

onMounted(() => {
  itemStore.getBusinessCategories()
})
</script>

<template>


    <div class="flex flex-row">
      <div class="basis-1/5">
        <div style="height: 100vh;  display: flex; align-items: center;">
          <div>
            <Menu :model="itemStore.businessCategories" >
              <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="'/categories/' + item.id" v-bind="props.action" @click="navigate"
                     style="font-weight: bold;  font-size: 18px"
                  >
                    <Avatar :image="item.image" class="mr-2" shape="circle" size="large" />
                    <span class="ml-2">{{ item.name }}</span>
                  </a>
                </router-link>
                <router-link v-else v-ripple :to="'/categories/' + item.id" :target="item.target"
                   v-bind="props.action" style="font-weight: bold; font-size: 18px">
                  <Avatar :image="item.image" class="mr-2" shape="circle" size="large" />
                  <span class="ml-2">{{ item.name }}</span>
                </router-link>
              </template>
            </Menu>
          </div>
        </div>
      </div>
      <div class="basis-4/5">
        <RouterView />
      </div>
    </div>

</template>

<style scoped>
.rite{
  font-size: 1.5rem;
}
</style>
