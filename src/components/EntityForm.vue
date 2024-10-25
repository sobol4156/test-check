<template>
  <div v-if="entity">
    <form
      @submit.prevent="submitForm"
      class="space-y-4 p-4 bg-white shadow-md rounded-md"
    >
      <div class="flex flex-col">
        <label class="font-semibold mb-2">Title</label>
        <input
          @model="entity.title"
          type="text"
          maxlength="50"
          required
          class="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div class="flex flex-col">
        <label class="font-semibold mb-2">Description</label>
        <textarea
          @model="entity.description"
          class="border p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
      </div>
      <div class="flex items-center space-x-2">
        <input
          @model="entity.published"
          type="checkbox"
          class="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label class="font-semibold">Published</label>
      </div>
      <div class="flex flex-col">
        <label class="font-semibold mb-2">Published From</label>
        <input
          @model="entity.published_from"
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

const props = defineProps<{ initialEntity: Entity | undefined; create?: Boolean }>();
const emiters = defineEmits(["edit", "create"]);
const entity = ref(props.initialEntity);

const submitForm = async () => {
  const eventType = props.create ? "create" : "edit";
  emiters(eventType, entity.value);
};
</script>
