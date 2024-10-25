import { mount } from '@vue/test-utils';
import EntityForm from '@/components/EntityForm.vue';
import { describe, it, expect } from 'vitest';

describe('EntityForm.vue', () => {
  const mockEntity = {
    id: 1,
    title: 'Test Entity',
    description: 'Description here',
    published: true,
    published_from: '2023-10-01',
  };

  it('renders form correctly when entity is provided', () => {
    const wrapper = mount(EntityForm, {
      props: {
        initialEntity: mockEntity,
        create: false,
      },
    });

    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('input[type="date"]').exists()).toBe(true);

    const titleInput = wrapper.find('input[type="text"]').element as HTMLInputElement;
    expect(titleInput.value).toBe(mockEntity.title);

    const descriptionTextarea = wrapper.find('textarea').element as HTMLTextAreaElement;
    expect(descriptionTextarea.value).toBe(mockEntity.description);

    const checkbox = wrapper.find('input[type="checkbox"]').element as HTMLInputElement;
    expect(checkbox.checked).toBe(mockEntity.published);

    const dateInput = wrapper.find('input[type="date"]').element as HTMLInputElement;
    expect(dateInput.value).toBe(mockEntity.published_from);
  });

  it('show "Loading..." when entity is not provide', () => {
    const wrapper = mount(EntityForm, {
      props: {
        initialEntity: undefined,
        create: false
      }
    })
    expect(wrapper.text()).toContain('Loading...')
  })

  it('emits "edit" event when editing the entity', async () => {
    const wrapper = mount(EntityForm, {
      props: {
        initialEntity: mockEntity,
        create: false,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().edit).toBeTruthy();
    expect(wrapper.emitted().edit[0]).toEqual([mockEntity]);
  });

  it('emits "create" event when creating a new entity', async () => {
    const wrapper = mount(EntityForm, {
      props: {
        initialEntity: mockEntity,
        create: true,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted().create).toBeTruthy();
    expect(wrapper.emitted().create[0]).toEqual([mockEntity]);
  });

});

