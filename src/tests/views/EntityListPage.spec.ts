import { mount } from '@vue/test-utils';
import EntityListPage from '@/views/EntityListPage.vue';
import EntityCreate from '@/views/EntityCreate.vue';
import EntityList from '@/components/EntityList.vue';
import { describe, it, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';


const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: EntityListPage },
  { path: '/create', component: EntityCreate }
  ],
});
const pinia = createPinia();

describe('EntityListPage.vue', () => {
  it('renders the page correctly', () => {

    const wrapper = mount(EntityListPage, {
      global: {
        plugins: [router, pinia]
      }
    });


    expect(wrapper.find('h1').text()).toBe('Entity List');
    expect(wrapper.findComponent(EntityList).exists()).toBe(true);
  });

  it('navigates to create page when "Create New Entity" button is clicked', async () => {
    const wrapper = mount(EntityListPage, {
      global: {
        plugins: [router, pinia]
      }
    });

    const createButton = wrapper.find('button');
    expect(createButton.exists()).toBe(true);

    const routerPushSpy = vi.spyOn(router, 'push');

    await createButton.trigger('click');
    expect(routerPushSpy).toHaveBeenCalledWith('/create');

  });
});
