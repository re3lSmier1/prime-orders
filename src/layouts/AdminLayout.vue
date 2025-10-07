<script setup lang="ts">

</script>

<template>
  <div>
    <div class="flex">
      <div class="size-14 flex-none ">
        <div class="h-screen bg-[#555] shadow-lg">
          <div>
            <a href="#" class="text-center p-3">
              <div><span class="pi pi-search"></span></div>
              <div>Search</div>
            </a>
          </div>
        </div>
      </div>
      <div class="grow h-screen">
        <RouterView />
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>