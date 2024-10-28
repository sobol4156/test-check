import { mount } from '@vue/test-utils';
import CreateEntityPage from '@/views/CreateEntityPage.vue';
import EntityForm from '@/components/EntityForm.vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import { describe, it, expect, vi } from 'vitest';
import { createPinia } from 'pinia';

vi.mock('@/store/entityStore', () => ({
  useEntityStore: vi.fn(() => ({
    addEntity: vi.fn(),
  })),
}));

describe('CreateEntityPage.vue', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/create', component: CreateEntityPage }],
  });

  const pinia = createPinia();

  it('renders EntityForm with create and initialEntity props', async () => {
    router.push('/create');
    await router.isReady();

    const newEntity = {
      id: 0,
      title: "",
      description: "",
      published: false,
      published_from: new Date().toISOString().slice(0, 10),
    };

    const wrapper = mount(CreateEntityPage, {
      global: {
        plugins: [router, pinia],
      },
      props: {
        initialEntity: newEntity,
        create: true,
      },
    });

    const entityForm = wrapper.findComponent(EntityForm);

    expect(entityForm.props('initialEntity')).toEqual(newEntity);
    expect(entityForm.props('create')).toBe(true);
  });
});