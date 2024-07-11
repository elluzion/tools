import type { Context } from '$lib/types/context';
import type { Song } from '$lib/types/song';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import type { SuperForm } from 'sveltekit-superforms';

export interface FormPageStore {
  page: {
    current: number;
    total: number;
  };
  form: SuperForm<Song, unknown>;
  isEditing: boolean;
  showSoundcloudImport: boolean;
}

export const initFormStore = (form: SuperForm<Song, unknown>) => {
  // Initialize data
  const data: FormPageStore = {
    page: { current: 1, total: 3 },
    form: form,
    showSoundcloudImport: true,
    isEditing: false,
  };

  setContext('formStore', writable<FormPageStore>(data));
  return getFormStore();
};

export const getFormStore = () => getContext<Context<FormPageStore>>('formStore');
