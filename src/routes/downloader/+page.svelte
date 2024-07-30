<script lang="ts">
  import type { Song } from '$api/types/song';
  import { page } from '$app/stores';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import SpacerHandle from '$lib/components/spacer-handle.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input';
  import { Api, ApiUrl } from '$lib/utilities/api';
  import Formatter from '$lib/utilities/formatter';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';

  let inputUrl: string | undefined = undefined;
  let trackData: Song | undefined = undefined;

  onMount(() => {
    const urlParam = $page.url.searchParams.get('u');

    if (urlParam) {
      inputUrl = urlParam;
      requestButtonClicked();

      // Remove URL from URL bar
      $page.url.searchParams.delete('u');
      history.replaceState(null, '', $page.url);
    }
  });

  async function request() {
    const url = inputUrl;
    inputUrl = undefined;

    if (!url) {
      return Promise.reject('No URL provided');
    }

    // Check if URL is valid
    if (!url || !url.startsWith('https://') || !url.includes('soundcloud.com')) {
      return Promise.reject('Invalid Soundcloud URL');
    }

    // Reset art data
    trackData = undefined;

    // Request data from API
    const { data, error } = await Api.soundcloud.import.get({
      query: { url },
    });
    // Error happened while requesting
    if (error) {
      return Promise.reject(error.value);
    }

    trackData = data;
    // Success
    return Promise.resolve('Success!');
  }

  async function download() {
    if (!trackData) return Promise.reject('No track data');

    const url = `${ApiUrl}/soundcloud/download?url=${encodeURIComponent(trackData.url)}`;

    await fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const filename = `${Formatter.joinList(trackData!!.artists, false)} - ${trackData!!.title}.mp3`;
        const objectUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';

        a.href = objectUrl;
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        return Promise.resolve('Downloading!');
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  function requestButtonClicked() {
    toast.promise(request(), {
      loading: 'Loading...',
      success: 'Success!',
      error: (err) => err,
    });
  }

  function downloadButtonClicked() {
    toast.promise(download(), {
      loading: 'Downloading...',
      success: 'Download started!',
      error: 'Error while downloading :/',
    });
  }

  setPageHeaderTitle('Soundcloud Downloader');
</script>

<div class="content-wrapper">
  <div class="flex flex-col gap-2">
    <Input bind:value={inputUrl} name="url" placeholder="URL" />
    <Button on:click={() => requestButtonClicked()} class="w-full">Load</Button>
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
          {#if trackData.genre}
            <Badge variant="secondary" class="font-mono text-nowrap w-min text-muted-text">
              {trackData.genre}
            </Badge>
          {/if}
        </div>
      </div>

      <div>
        <Button on:click={() => downloadButtonClicked()} class="w-full">Download</Button>
      </div>
    </div>
  {/if}
</div>
