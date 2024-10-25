<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEntityStore } from "@/store/entityStore";
import { useRouter } from "vue-router";

const store = useEntityStore();
const router = useRouter();
const filterText = ref("");

onMounted(async () => {
  if (!store.entities.length) {
    await store.getEntities();
  }
});

const filteredEntities = computed(() => {
  return store.entities.filter((entity) =>
    entity.title.toLowerCase().includes(filterText.value.toLowerCase())
  );
});

const editEntity = (id: number) => {
  router.push(`/edit/${id}`);
};

const confirmDelete = (id: number) => {
  if (confirm("Are you sure you want to delete this entity?")) {
    store.deleteEntity(id);
  }
};
</script>
