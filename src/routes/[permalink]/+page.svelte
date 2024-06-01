<script lang="ts">
  import { goto } from '$app/navigation';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import PlatformIcon from '$lib/components/platform-icon.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Formatter from '$lib/utilities/formatter';
  import { resolvePlatform, type Platform } from '$lib/utilities/platforms.js';
  import SongInfoSheet from './_components/song-info-sheet.svelte';

  export let data;
  if (!data.song) goto('/');
  const song = data.song!;
  const platforms = song.streamLinks.map((x) => resolvePlatform(x));

  setPageHeaderTitle(song.title);

  function getTextColor(platform: Platform) {
    return platform.brightColor ? '#000' : '#fff';
  }
</script>

<div class="!p-0 !mt-0 content-wrapper">
  <!-- Blurry background -->
  <div class="pb-12 overflow-hidden pointer-events-none content-width h-contentDvh">
    <img
      src={song.artUrl}
      alt="art"
      class="w-full h-full blur-3xl"
      style="mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 99%);
      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 99%);"
    />
  </div>
  <!-- Foreground -->
  <div class="fixed overflow-scroll -translate-y-full content-width h-contentDvh !pb-20">
    <!-- TOP -->
    <div class="flex flex-col items-center justify-center gap-8 mt-24 mb-4">
      <img
        src={song.artUrl.replace('large', 't500x500')}
        alt="art"
        class="shadow-2xl w-52 h-52 rounded-2xl"
      />
      <div class="flex flex-col items-center w-full gap-2 px-4 drop-shadow-xl">
        <h3 class="w-full text-3xl font-semibold tracking-tight text-center truncate">
          {song.title}
        </h3>
        <p class="w-full font-medium text-center truncate opacity-70">
          {Formatter.joinList(song.artists)}
        </p>
      </div>
    </div>
    <!-- BUTTONS -->
    <div class="flex flex-col items-stretch justify-center gap-2 p-4">
      {#each song.streamLinks as link, index}
        <Button
          class="flex gap-2 truncate shadow-xl h-14"
          style="
          background-color: {platforms[index].color};
          color: {getTextColor(platforms[index])};"
          on:click={() => window.open(link, '_blank')}
        >
          <PlatformIcon platform={platforms[index].id} fill={getTextColor(platforms[index])} />
          {platforms[index].name}
        </Button>
      {/each}
    </div>
  </div>

  <!-- Infosheet -->
  <SongInfoSheet {song} />
</div>
