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

const store = useEntityStore();
const router = useRouter();

const newEntity: Entity = {
  id: 0,
  title: "",
  description: "",
  published: false,
  published_from: null,
};

const addToStore = (entity: Entity) => {
  store.addEntity(entity);
}

const createEntity = async(entity: Entity) => {
  try {
    let response;
    response = await api.post("/entityList", entity);

    if (response.status === 201 || response.status === 200) {
      addToStore(entity)
      router.push("/");
    }
  } catch (error) {
    console.error("Ошибка при отправке данных:", error);
  }
};
</script>
