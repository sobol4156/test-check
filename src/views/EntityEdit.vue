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

const store = useEntityStore();
const route = useRoute();
const router = useRouter();
const entity = computed(() => {
  return store.editEntities;
});

const saveEditEntity = async (entity:Entity) => {
  try {
    let response;
    if (entity.id === 0) {
      response = await api.post("/entityList", entity);
    } else {
      response = await api.put(`/entityList/${entity.id}`, entity);
    }

    if (response.status === 201 || response.status === 200) {
      store.addEditEntity(entity);
      await store.getEntities();
      router.push("/");
    }
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
};

onMounted(async() => {
  if (!store.editEntities) {
    await store.getEntity(route.params.id.toString());
  }
});
</script>
