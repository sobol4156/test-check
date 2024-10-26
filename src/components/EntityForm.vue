<template>
  <div v-if="entity">
    <form
      @submit.prevent="submitForm"
      class="space-y-4 p-4 bg-white shadow-md rounded-md"
    >
      <div class="flex flex-col">
        <label class="font-semibold mb-2">Title</label>
        <input
          v-model="entity.title"
          type="text"
          maxlength="50"
          required
          class="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div class="flex flex-col">
        <label class="font-semibold mb-2">Description</label>
        <textarea
          v-model="entity.description"
          class="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
      </div>
      <div class="flex items-center space-x-2">
        <input
          v-model="entity.published"
          type="checkbox"
          class="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label class="font-semibold">Published</label>
      </div>
      <div class="flex flex-col">
        <label class="font-semibold mb-2">Published From</label>
        <input
          v-model="entity.published_from"
          type="date"
          class="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Save
      </button>
    </form>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Entity } from "@/types/Entity";

// Define props with TypeScript types
const props = defineProps<{
  /** Initial entity data to populate the form */
  initialEntity: Entity | undefined;
  /** Determines if the form is used for creating a new entity */
  create?: boolean;
}>();

// Define emits with TypeScript types
const emiters = defineEmits<{
  (e: "edit", entity: Entity | undefined): void;
  (e: "create", entity: Entity | undefined): void;
}>();

// Local ref for entity data, initialized from props
const entity = ref<Entity | undefined>(props.initialEntity);

/**
 * Handles form submission and emits either "edit" or "create" event
 * based on the `create` prop.
 * @returns {void}
 */
const submitForm = (): void => {
  const eventType: "create" | "edit" = props.create ? "create" : "edit";

  if (eventType === "create") {
    emiters("create", entity.value);
  } else {
    emiters("edit", entity.value);
  }
};
</script>
