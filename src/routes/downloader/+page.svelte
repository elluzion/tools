<script lang="ts">
  import type { Song } from '$api/types/song';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import SpacerHandle from '$lib/components/spacer-handle.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input';
  import { Api } from '$lib/utilities/api';
  import Formatter from '$lib/utilities/formatter';
  import toast from 'svelte-french-toast';

  let inputUrl: string | undefined = undefined;
  let trackData: Song | undefined = undefined;

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
    const { data, error } = await Api.soundcloud.import.get({
      query: { url: inputUrl },
    });
    // Error happened while requesting
    if (error) {
      toast.error(error.value);
      console.log(error);
      return;
    }

    trackData = data;
    inputUrl = undefined;

    // Success
    toast.success('Successful');
  }

  async function download() {
    if (!trackData) return;

    const url = `${window.origin}/api/soundcloud/download?url=${encodeURIComponent(trackData.url)}`;

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
      })
      .catch((err) => toast.error(err));
  }

  setPageHeaderTitle('Soundcloud Downloader');
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
          {#if trackData.genre}
            <Badge variant="secondary" class="font-mono text-nowrap w-min text-muted-text">
              {trackData.genre}
            </Badge>
          {/if}
        </div>
      </div>

      <div>
        <Button on:click={() => download()} class="w-full">Download</Button>
      </div>
    </div>
  {/if}
</div>
