<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 text-[#444343]">Entity List</h1>
    <entity-list />
    <button
      @click="goToCreatePage"
      class="bg-green-500 text-white py-2 px-4 mt-4 rounded"
    >
      Create New Entity
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import EntityList from "@/components/EntityList.vue";

const router = useRouter();

const goToCreatePage = () => {
  router.push("/create");
};
</script>
