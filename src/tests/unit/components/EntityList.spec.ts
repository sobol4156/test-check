import { mount } from '@vue/test-utils';
import EntityList from '@/components/EntityList.vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useEntityStore } from '@/store/entityStore';
import { createRouter, createWebHistory } from 'vue-router';
import EntityListPage from '@/views/EntityListPage.vue';

const mockEntities = [
  { id: 1, title: 'Test En1', description: '', published: true },
  { id: 2, title: 'En2 Test', description: '', published: false },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: EntityListPage }],
});

describe('EntityList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  });

  it('renders a list of entities', () => {
    const store = useEntityStore();
    store.entities = mockEntities;

    const wrapper = mount(EntityList, {
      global: {
        plugins: [router]
      }
    })

    const items = wrapper.findAll('li');
    expect(items.length).toBe(2);
    expect(items[0].text()).toContain('Test En1 (Published)')
    expect(items[1].text()).toContain('En2 Test (Unpublished)');
  })

  it('filters entities by title', async () => {
    const store = useEntityStore();
    store.entities = mockEntities;

    const wrapper = mount(EntityList, {
      global: {
        plugins: [router]
      }
    })

    const input = wrapper.find('input');
    await input.setValue('Test En1');
    await wrapper.vm.$nextTick();

    const items = wrapper.findAll('li')

    expect(items.length).toBe(1);
    expect(items[0].text()).toContain('Test En1')
  })
})
