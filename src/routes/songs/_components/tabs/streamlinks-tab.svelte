<script lang="ts">
  import type { APIGetStreamLinksResult } from '$lib/api/types/results';
  import ExpandableCard from '$lib/components/expandable-card.svelte';
  import PlatformIcon from '$lib/components/platform-icon.svelte';
  import SpacerHandle from '$lib/components/spacer-handle.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as ToggleGroup from '$lib/components/ui/toggle-group';
  import { MusicPlatforms, Platforms, resolvePlatform } from '$lib/shared/platforms';
  import Formatter from '$lib/utilities/formatter';
  import Requester from '$lib/utilities/requester';
  import toast from 'svelte-french-toast';
  import { getFormStore } from '../../_lib/song-form-store';
  import StreamLinkEntry from '../ui/stream-link-entry.svelte';

  const formStore = getFormStore();

  $: form = $formStore.form;
  $: formData = $formStore.form.form;
  $: platformsWithLink = $formData.streamLinks.map((x) => resolvePlatform(x)?.id || 'default');

  let checkedPlatforms: string[];
  let addLink: string;
  let fetchLinksButtonEnabled = true;

  function addLinkClicked() {
    resetToggleGroup();
    const cleanedLink = addLink.trim();
    if (addLink.startsWith('https://') && !$formData.streamLinks.includes(cleanedLink)) {
      $formData.streamLinks = [...$formData.streamLinks, addLink];
    }
    addLink = '';
  }

  function onFetchLinksClicked() {
    fetchLinksButtonEnabled = false;
    toast.promise(fetchLinks(), {
      loading: 'Fetching links...',
      success: (data) => {
        resetToggleGroup();
        const platforms = data.links.map((x) => resolvePlatform(x)).map((x) => x.name);
        return 'Found links for ' + Formatter.joinList(platforms, true);
      },
      error: (msg) => {
        resetToggleGroup();
        return msg;
      },
    });
  }

  async function fetchLinks() {
    // Missing data
    if ($formData.artists.length === 0) {
      return Promise.reject('Please provide at least one artist');
    }
    if (!$formData.title) {
      return Promise.reject('Please provide a song title');
    }

    // Get links
    let query = `${$formData.artists.join(' ')} - ${$formData.title}`;
    const { data, error } = await Requester.post<APIGetStreamLinksResult>(
      `/api/songs/get-stream-links`,
      {
        query: query,
        platforms: checkedPlatforms,
      },
    );

    // Error while fetching
    if (error) {
      return Promise.reject(error.message);
    }

    // Links fetched
    if (data) {
      if (data.links.length === 0) {
        const platforms = data.failed.map(
          (platformId) => Platforms.find((plat) => plat.id == platformId)?.name || platformId,
        );
        return Promise.reject('No links found on ' + Formatter.joinList(platforms, true));
      }

      const newLinks = data.links.filter((x) => !$formData.streamLinks.includes(x));
      $formData.streamLinks = [...$formData.streamLinks, ...newLinks];
    }

    return data;
  }

  function resetToggleGroup() {
    checkedPlatforms = [];
    fetchLinksButtonEnabled = true;
  }
</script>

<div class="flex flex-col gap-4">
  <ToggleGroup.Root
    variant="outline"
    class="flex sm:gap-4 justify-between w-full *:w-10 *:p-2 *:sm:w-full *:sm:h-12"
    type="multiple"
    value={checkedPlatforms}
    onValueChange={(value) => (checkedPlatforms = value || [])}
  >
    {#each MusicPlatforms as platform}
      <ToggleGroup.Item value={platform.id} disabled={platformsWithLink.includes(platform.id)}>
        <PlatformIcon platform={platform.id} />
      </ToggleGroup.Item>
    {/each}
  </ToggleGroup.Root>
  <Button disabled={!fetchLinksButtonEnabled} on:click={onFetchLinksClicked}
    >Fetch links for selected</Button
  >
  <ExpandableCard expanded={false} title="Add link">
    <Input
      bind:value={addLink}
      on:keydown={(e) => e.key === 'Enter' && addLinkClicked()}
      class="bg-elevation-1"
      placeholder="URL"
      type="url"
    />
    <Button on:click={addLinkClicked}>Add</Button>
  </ExpandableCard>
  {#if $formData.streamLinks.length > 0}
    <SpacerHandle />
  {/if}
  <div class="flex flex-col gap-2">
    {#each $formData.streamLinks as url}
      <StreamLinkEntry {url} />
    {/each}
  </div>
  <Form.Field {form} name="streamLinks">
    <Form.FieldErrors />
  </Form.Field>
</div>
