<script lang="ts">
  import MaterialSymbol from '$lib/components/material-symbol.svelte';
  import PlatformIcon from '$lib/components/platform-icon.svelte';
  import { Button } from '$lib/components/ui/button';
  import { resolvePlatform } from '$lib/shared/platforms';
  import { getFormStore } from '../../_lib/song-form-store';
  import SlimListEntry from './slim-list-entry.svelte';

  export let url: string;

  const formStore = getFormStore();
  $: formData = $formStore.form.form;
  $: platformId = resolvePlatform(url).id;

  function removeEntry() {
    $formData.streamLinks = $formData.streamLinks.filter((entry) => entry !== url);
  }
</script>

<SlimListEntry class="flex items-center justify-center gap-3">
  <PlatformIcon platform={platformId} />
  <a
    href={url}
    target="_blank"
    class="font-mono text-sm font-medium truncate cursor-pointer grow text-muted-text hover:underline underline-offset-2"
    >{url}</a
  >
  <Button variant="ghost" size="icon" class="w-6 h-6 rounded-full" on:click={removeEntry}
    ><MaterialSymbol>close</MaterialSymbol></Button
  >
</SlimListEntry>
