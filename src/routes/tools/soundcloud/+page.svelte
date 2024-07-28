<script lang="ts">
  import type { APISoundcloudImportResult } from '$lib/api/types/results.js';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import SpacerHandle from '$lib/components/spacer-handle.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input';
  import Formatter from '$lib/utilities/formatter';
  import Requester from '$lib/utilities/requester.js';
  import toast from 'svelte-french-toast';

  let inputUrl: string | undefined = undefined;
  let trackData: APISoundcloudImportResult | undefined = undefined;

  async function request() {
    if (!inputUrl) {
      toast.error('No URL provided');
      return;
    }

    // Check if URL is valid
    if (!inputUrl || !inputUrl.startsWith('https://') || !inputUrl.includes('soundcloud.com')) {
      toast.error('Invalid Soundcloud URL');
      return;
    }

    // Reset art data
    trackData = undefined;

    // Request data from API
    const { data, error } = await Requester.post<APISoundcloudImportResult>(
      '/api/songs/soundcloud-import',
      { url: inputUrl },
    );

    // Error happened while requesting
    if (error) {
      toast.error(error.message);
      console.log(error.message);
      return;
    }

    if (!data.artUrl) {
      toast.error('Song has no artwork');
      return;
    }

    console.log(data);

    trackData = data;
  }

  setPageHeaderTitle('Soundcloud Loader');
</script>

<div class="content-wrapper">
  <div class="flex flex-col gap-2">
    <Input bind:value={inputUrl} name="url" placeholder="URL" />
    <Button on:click={() => request()} class="w-full">Load</Button>
  </div>

  {#if trackData}
    <div class="flex flex-col gap-4 mt-4">
      <SpacerHandle light={true} />
      <div class="flex gap-4">
        <div>
          <img src={trackData?.artUrl} alt="Album cover" class="w-32 rounded-xl" />
        </div>
        <div class="flex flex-col justify-center gap-1">
          <p class="text-xl font-semibold">{trackData.title}</p>
          <p class="mb-1 font-mono text-muted-text">
            {Formatter.joinList(trackData.artists, true)}
          </p>
          <Badge variant="secondary" class="font-mono text-nowrap w-min text-muted-text">
            {trackData.genre}
          </Badge>
        </div>
      </div>

      <div>
        <Button>Download</Button>
      </div>
    </div>
  {/if}
</div>
