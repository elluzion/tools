import type { Context } from '$lib/types/context';
import type { Song } from '$lib/types/song';
import { getContext, setContext } from 'svelte';
import { writable } from 'svelte/store';
import type { SuperForm } from 'sveltekit-superforms';

export const initFormStore = (data: FormPageStore) => {
  setContext('formStore', writable<FormPageStore>(data));

  return getFormStore();
};

export const getFormStore = () => getContext<Context<FormPageStore>>('formStore');

export type FormPageStore = {
  page: {
    current: number;
    total: number;
  };
  form: SuperForm<Song, unknown>;
};
