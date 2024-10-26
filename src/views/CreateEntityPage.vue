<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Create Entity</h1>
    <entity-form
      :initialEntity="newEntity"
      :create="true"
      @create="createEntity"
    />
  </div>
</template>

<script setup lang="ts">
import { useEntityStore } from "@/store/entityStore";
import { useRouter } from "vue-router";
import EntityForm from "@/components/EntityForm.vue";
import type { Entity } from "@/types/Entity";
import { api } from "@/api";

// Initialize the store and router
const store = useEntityStore();
const router = useRouter();

/**
 * Default entity data for a new entity.
 * @type {Entity}
 */
const newEntity: Entity = {
  id: 0,
  title: "",
  description: "",
  published: false,
  published_from: null,
};

/**
 * Adds a new entity to the store by calling the store's `addEntity` method.
 * @param {Entity} entity - The entity object to be added to the store.
 * @returns {void}
 */
const addToStore = (entity: Entity): void => {
  store.addEntity(entity);
};

/**
 * Creates a new entity by making a POST request to the API.
 * After successful creation, it adds the entity to the store and redirects to the home page.
 * @async
 * @param {Entity | undefined} entity - The entity object with the data to be saved.
 * @returns {Promise<void>}
 */
const createEntity = async (entity?: Entity): Promise<void> => {
  if (!entity) return;

  try {
    const response = await api.post("/entityList", entity);

    // If the entity was successfully created, add it to the store and redirect
    if (response.status === 201 || response.status === 200) {
      addToStore(entity);
      router.push("/");
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};
</script>
