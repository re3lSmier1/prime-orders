<script setup lang="ts">
import {ref} from "vue";
import router from "@/router";
import {useItemStore} from "@/stores/itemStore.ts";
import Navbar from "@/components/Navbar.vue";
const itemStore = useItemStore();

const items = ref([
  {
    label: 'Sandwiches',
    icon: 'pi pi-palette',
    route: '/sandwiches',
    image: '/sandwiches.png'
  },
  {
    label: 'Quesadilla',
    icon: 'pi pi-link',
    command: () => {
        router.push('/quesadilla');
    },
    image: '/quesadilla.png'
  },
  {
    label: 'Drinks',
    icon: 'pi pi-home',
    image: '/drinks.png',
    url: '/drinks'
  }
]);
</script>

<template>
  <main>
    <Navbar />
    <div class="flex flex-row">
      <div class="basis-1/5">
        <div style="height: 100vh;  display: flex; align-items: center;">
          <div>
            <Menu :model="items" >
              <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                  <a v-ripple :href="href" v-bind="props.action" @click="navigate"
                     style="font-weight: bold;  font-size: 18px"
                  >
                    <Avatar :image="item.image" class="mr-2" shape="circle" size="large" />
                    <span class="ml-2">{{ item.label }}</span>
                  </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target"
                   v-bind="props.action" style="font-weight: bold; font-size: 18px">
                  <Avatar :image="item.image" class="mr-2" shape="circle" size="large" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </template>
            </Menu>
          </div>
        </div>
      </div>
      <div class="basis-4/5">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped>
.rite{
  font-size: 1.5rem;
}
</style>
