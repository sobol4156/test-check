<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Entity</h1>
    <entity-form v-if="entity" :initialEntity="entity" @edit="saveEditEntity" />
    <p v-else>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useEntityStore } from "@/store/entityStore";
import { useRouter, useRoute } from "vue-router";
import EntityForm from "@/components/EntityForm.vue";
import type { Entity } from "@/types/Entity";
import { api } from "@/api";

// Initialize the store, route, and router
const store = useEntityStore();
const route = useRoute();
const router = useRouter();

/**
 * Reactive computed property that returns the currently edited entity from the store.
 * @type {import("vue").ComputedRef<Entity | null>}
 */
const entity = computed<Entity | null>(() => {
  return store.editEntities;
});

/**
 * Retrieves the entity ID from the route parameters on component mount.
 * If an entity ID is present, it fetches the entity data from the store.
 * @returns {Promise<void>}
 */
onMounted(async () => {
  const entityId: string | null = route.params.id
    ? route.params.id.toString()
    : null;
  if (entityId) {
    await store.getEntity(entityId);
  }
});

/**
 * Adds the updated entity to the store by calling the store's `addEditEntity` method.
 * @param {Entity} entity - The entity object to be added or updated in the store.
 * @returns {void}
 */
const addEditToStore = (entity: Entity): void => {
  store.addEditEntity(entity);
};

/**
 * Saves the edited entity by either creating a new entity or updating an existing one.
 * After saving, it adds the entity to the store, refreshes the entity list, and redirects to the home page.
 * @async
 * @param {Entity} entity - The entity object with updated data to be saved.
 * @returns {Promise<void>}
 */
const saveEditEntity = async (entity?: Entity): Promise<void> => {
  if (!entity) return;
  
  try {
    let response;
      // Updates an existing entity if the ID is not 0
      response = await api.put<Entity>(`/entityList/${entity.id}`, entity);

    // Checks if the request was successful and processes accordingly
    if (response.status === 201 || response.status === 200) {
      addEditToStore(entity);
      await store.getEntities();
      router.push("/");
    }
  } catch (error) {
    console.error("Error saving the entity:", error);
  }
};
</script>
