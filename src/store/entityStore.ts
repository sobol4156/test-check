import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Entity } from '@/types/Entity';
import { api } from '@/api';

export const useEntityStore = defineStore('entity', () => {
  const entities = ref<Entity[]>([]);
  const editEntities = ref<Entity | null>(null)

  const addEntity = (entity: Entity) => {
    entities.value.push(entity);
  };

  const addEditEntity = (entityUpdate: Entity) => {
    entities.value = entities.value.map(el => {
      if (el.id === entityUpdate.id) {
        return { ...el, ...entityUpdate }
      }
      return el
    })
  };

  const updateEntity = (updatedEntity: Entity) => {
    const index = entities.value.findIndex(e => e.id === updatedEntity.id);
    if (index !== -1) {
      entities.value[index] = updatedEntity;
    }
  };

  const deleteEntity = (id: number) => {
    entities.value = entities.value.filter(e => e.id !== id);
  };

  const getEntities = async () => {
    try {
      const response = await api.get('entityList');
      entities.value = response.data;
    } catch (error) {
      console.error('Ошибка при получении данных: ', error);
    }
  };
  const getEntity = async (id: string) => {

    let entity = entities.value.find(el => el.id === Number(id));

    if (!entity) {
      try {
        const response = await api.get(`entityList/${id}`);
        entity = response.data;
      } catch (error) {
        console.error('Ошибка при получении сущности: ', error);
      }
    }
    editEntities.value = entity || null;
  };
  return { entities, addEntity, updateEntity, deleteEntity, getEntity, getEntities, editEntities, addEditEntity };
});
