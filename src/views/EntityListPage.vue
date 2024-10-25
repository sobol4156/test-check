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
import { ref, computed, onMounted } from "vue";
import { useEntityStore } from "@/store/entityStore";
import { useRouter } from "vue-router";
import EntityList from "@/components/EntityList.vue";
import { api } from "@/api";

const store = useEntityStore();
const router = useRouter();
const filterText = ref("");

onMounted(async () => {
  if (!store.entities.length) {
    await store.getEntities();
  }
});

const filteredEntities = computed(() => {
  if (store.entities && store.entities.length) {
    return store.entities.filter((entity) =>
      entity.title.includes(filterText.value)
    );
  }
  return [];
});

const editEntity = (id: number) => {
  router.push(`/edit/${id}`);
};

const confirmDelete = async (id: number) => {
  if (confirm("Are you sure you want to delete this entity?")) {
    const response = await api.delete(`entityList/${id}`);
    if (response.status === 200) {
      store.deleteEntity(id);
    }
  }
};

const goToCreatePage = () => {
  router.push("/create");
};
</script>
