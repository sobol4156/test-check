import { mount } from '@vue/test-utils';
import EditEntityPage from '@/views/EditEntityPage.vue';
import EntityForm from '@/components/EntityForm.vue';
import { useEntityStore } from '@/store/entityStore';
import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, it, expect, vi } from 'vitest';
import { createPinia } from 'pinia';

vi.mock('@/store/entityStore', () => ({
  useEntityStore: vi.fn(() => ({
    editEntities: {
      id: 1,
      title: 'Test Entity',
      description: 'Test Description',
      published: true,
      published_from: '2023-10-01',
    },
    getEntity: vi.fn(),
    addEditEntity: vi.fn(),
    getEntities: vi.fn(),
  })),
}));

describe('EditEntityPage.vue', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/edit/:id', component: EditEntityPage }],
  });

  const pinia = createPinia();

  it('displays the edit form if the entity is loaded', async () => {
    router.push('/edit/1');
    await router.isReady();

    const store = useEntityStore();

    store.editEntities = {
      id: 1,
      title: 'Test Entity',
      description: 'Test Description',
      published: true,
      published_from: '2023-10-01',
    };

    const wrapper = mount(EditEntityPage, {
      global: {
        plugins: [router, pinia],
      },
      propsData: {
        initialEntity: store.editEntities,
      },
    });

    expect(wrapper.findComponent(EntityForm).exists()).toBe(true);
  });
});
