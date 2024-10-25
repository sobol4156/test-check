<template>
  <div>
    <input @model="filterText" placeholder="Filter by title" />
    <ul v-if="store.entities && store.entities.length">
      <li v-for="entity in filteredEntities" :key="entity.id">
        {{ entity.title }} ({{ entity.published ? 'Published' : 'Unpublished' }})
        <button @click="editEntity(entity.id)">Edit</button>
        <button @click="confirmDelete(entity.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEntityStore } from '@/store/entityStore';
import { useRouter } from 'vue-router';

const store = useEntityStore();
const router = useRouter();
const filterText = ref('');

const filteredEntities = computed(() => {
  return store.entities.filter(entity =>
    entity.title.toLowerCase().includes(filterText.value.toLowerCase())
  );
});

const editEntity = (id: number) => {
  router.push(`/edit/${id}`);
};

const confirmDelete = (id: number) => {
  if (confirm('Are you sure you want to delete this entity?')) {
    store.deleteEntity(id);
  }
};
</script>
