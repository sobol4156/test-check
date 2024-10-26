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
import { api } from "@/api";
import type { Entity } from "@/types/Entity"; // Assume this defines the structure of an Entity object

// Initialize the store and router
const store = useEntityStore();
const router = useRouter();

// Text for filtering entities by title
const filterText = ref<string>("");

/**
 * Fetches entities from the store on component mount if not already loaded.
 * @returns {Promise<void>}
 */
onMounted(async (): Promise<void> => {
  if (!store.entities.length) {
    await store.getEntities();
  }
});

/**
 * Computed property that returns the list of entities filtered by title.
 * Filters entities based on the input text in a case-insensitive manner.
 * @returns {Entity[]} Array of entities that match the filter criteria.
 */
const filteredEntities = computed((): Entity[] => {
  return store.entities.filter((entity) =>
    entity.title.toLowerCase().includes(filterText.value.toLowerCase())
  );
});

/**
 * Navigates to the edit page for a specific entity.
 * @param {number} id - The ID of the entity to edit.
 * @returns {void}
 */
const editEntity = (id: number): void => {
  router.push(`/edit/${id}`);
};

/**
 * Confirms and deletes an entity by ID.
 * Shows a confirmation dialog, and upon user confirmation, sends a delete request to the API.
 * @param {number} id - The ID of the entity to delete.
 * @returns {Promise<void>}
 */
const confirmDelete = async (id: number): Promise<void> => {
  if (confirm("Are you sure you want to delete this entity?")) {
    try {
      const response = await api.delete(`/entityList/${id}`);

      if (response.status === 200 || response.status === 201) {
        store.deleteEntity(id);
        router.push("/"); // Redirect to the main page after deletion
      }
    } catch (error) {
      console.error("Error while deleting entity:", error);
    }
  }
};
</script>
