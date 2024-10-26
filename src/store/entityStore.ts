import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Entity } from '@/types/Entity';
import { api } from '@/api';

/**
 * Store for managing entities, including add, edit, update, delete, and fetch operations.
 */
export const useEntityStore = defineStore('entity', () => {
  /** Array of entities in the store */
  const entities = ref<Entity[]>([]);

  /** Currently selected entity for editing */
  const editEntities = ref<Entity | null>(null);

  /**
   * Adds a new entity to the store.
   * @param {Entity} entity - The entity to add.
   */
  const addEntity = (entity: Entity): void => {
    entities.value.push(entity);
  };

  /**
   * Updates an existing entity in the store based on its ID.
   * @param {Entity} entityUpdate - The entity with updated data.
   */
  const addEditEntity = (entityUpdate: Entity): void => {
    entities.value = entities.value.map(el =>
      el.id === entityUpdate.id ? { ...el, ...entityUpdate } : el
    );
  };

  /**
   * Replaces an entity in the store by index.
   * @param {Entity} updatedEntity - The entity with updated data.
   */
  const updateEntity = (updatedEntity: Entity): void => {
    const index = entities.value.findIndex(e => e.id === updatedEntity.id);
    if (index !== -1) {
      entities.value[index] = updatedEntity;
    }
  };

  /**
   * Removes an entity from the store by ID.
   * @param {number} id - The ID of the entity to delete.
   */
  const deleteEntity = (id: number): void => {
    entities.value = entities.value.filter(e => e.id !== id);
  };

  /**
   * Fetches the list of entities from the API and stores it.
   * @async
   * @returns {Promise<void>}
   */
  const getEntities = async (): Promise<void> => {
    try {
      const response = await api.get<Entity[]>('entityList');
      entities.value = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /**
   * Fetches a single entity by ID. Sets `editEntities` with the fetched entity.
   * @async
   * @param {string} id - The ID of the entity to fetch.
   * @returns {Promise<void>}
   */
  const getEntity = async (id: string): Promise<void> => {
    let entity = entities.value.find(el => el.id === Number(id));

    if (!entity) {
      try {
        const response = await api.get<Entity>(`entityList/${id}`);
        entity = response.data;
      } catch (error) {
        console.error('Error fetching entity:', error);
      }
    }
    editEntities.value = entity || null;
  };

  return {
    entities,
    addEntity,
    addEditEntity,
    updateEntity,
    deleteEntity,
    getEntities,
    getEntity,
    editEntities,
  };
});
