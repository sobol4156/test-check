<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4 text-[#444343]">Entity List</h1>
    <input
      v-model="filterText"
      class="shadow border rounded py-2 px-3 w-full mb-4 text-[#444343]"
      placeholder="Filter by title"
    />
    <ul v-if="store.entities && store.entities.length">
      <li
        v-for="entity in filteredEntities"
        :key="entity.id"
        class="flex justify-between items-center p-2 bg-gray-100 mb-2 rounded"
      >
        <div>
          <h2 class="text-lg font-semibold">{{ entity.title }}</h2>
          <p>{{ entity.description }}</p>
          <p>{{ entity.published ? "Published" : "Unpublished" }}</p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="editEntity(entity.id)"
            class="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            @click="confirmDelete(entity.id)"
            class="bg-red-500 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
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
