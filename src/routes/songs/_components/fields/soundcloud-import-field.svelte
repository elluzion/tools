<script lang="ts">
  import type { APISoundcloudImportResult } from '$lib/api/types/results';
  import ExpandableCard from '$lib/components/expandable-card.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import Requester from '$lib/utilities/requester';
  import toast from 'svelte-french-toast';
  import { getFormStore } from '../../stores';

  const formStore = getFormStore();

  $: formData = $formStore.form.form;
  let expanded = true;
  let url: string = '';
  let buttonEnabled = true;

  function onImportClicked() {
    if (url.startsWith('https://') && url.includes('soundcloud.com')) {
      toast.promise(importSoundcloud(url), {
        loading: 'Importing...',
        success: (title: string) => {
          expanded = false;
          setTimeout(() => {
            $formStore.showSoundcloudImport = false;
          }, 200);
          return `${title} imported!`;
        },
        error: (err) => {
          url = '';
          buttonEnabled = true;
          return err;
        },
      });
    }
  }

  /**
   * Import from Soundcloud
   * @param url - The URL of the song.
   * @returns true if the import was successful, false otherwise.
   */
  async function importSoundcloud(url: string) {
    const { data, error } = await Requester.post<APISoundcloudImportResult>(
      '/api/songs/soundcloud-import',
      {
        url,
      },
    );

    if (error) {
      return Promise.reject(JSON.parse(error.message).message);
    }

    $formData.artists = [...$formData.artists, ...data.artists];
    $formData.title = data.title;
    $formData.permalink = data.permalink.slice(0, 49);
    $formData.releaseDate = new Date(data.releaseDate);
    $formData.label = data.label;
    $formData.type = data.type;
    if (data.artUrl) $formData.artUrl = data.artUrl;
    if (data.genre) $formData.genre = data.genre;
    $formData.streamLinks = [...$formData.streamLinks, url];

    return Promise.resolve(data.title);
  }
</script>

{#if $formStore.showSoundcloudImport}
  <ExpandableCard {expanded} class="mb-4" title="Import from Soundcloud">
    <Input
      bind:value={url}
      placeholder="https://soundcloud.com/username/track"
      class="w-auto grow bg-elevation-1"
      on:keydown={(e) => e.key === 'Enter' && onImportClicked()}
    />
    <Button disabled={buttonEnabled ? false : true} on:click={() => onImportClicked()}
      >Import</Button
    >
  </ExpandableCard>
{/if}
