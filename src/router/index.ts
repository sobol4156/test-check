import { createRouter, createWebHistory } from 'vue-router';
import EntityListPage from '@/views/EntityListPage.vue';
import EntityCreate from '@/views/EntityCreate.vue';
import EntityEdit from '@/views/EntityEdit.vue';

const routes = [
  { path: '/', component: EntityListPage },
  { path: '/create', component: EntityCreate },
  { path: '/edit/:id', component: EntityEdit, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;