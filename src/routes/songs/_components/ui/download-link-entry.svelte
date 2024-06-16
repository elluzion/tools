<script lang="ts">
  import MaterialSymbol from '$lib/components/material-symbol.svelte';
  import { Button } from '$lib/components/ui/button';
  import type { Song } from '$lib/types/song';
  import { getFormStore } from '../../stores';
  import SlimListEntry from './slim-list-entry.svelte';

  const formStore = getFormStore();

  $: form = $formStore.form;
  $: formData = $formStore.form.form;

  export let download: Song['downloadLinks'][0];

  function removeEntry() {
    $formData.downloadLinks = $formData.downloadLinks.filter((entry) => entry !== download);
  }
</script>

<SlimListEntry class="flex items-center justify-between gap-3 !py-2 !pl-2">
  <span class="px-3 py-2 font-mono text-sm font-medium rounded-full text-muted-text bg-elevation-1"
    >{download.format}</span
  >
  <a
    href={download.url}
    target="_blank"
    class="font-mono text-sm font-medium truncate grow text-muted-text hover:underline underline-offset-2"
    >{download.edit} •
    {download.url}
  </a>
  <Button variant="ghost" size="icon" class="w-6 h-6 rounded-full" on:click={removeEntry}
    ><MaterialSymbol>close</MaterialSymbol></Button
  >
</SlimListEntry>
