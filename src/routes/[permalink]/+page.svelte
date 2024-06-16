<script lang="ts">
  import { goto } from '$app/navigation';
  import MaterialSymbol from '$lib/components/material-symbol.svelte';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import PlatformIcon from '$lib/components/platform-icon.svelte';
  import SpacerHandle from '$lib/components/spacer-handle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { resolvePlatform, type Platform } from '$lib/shared/platforms.js';
  import { clampNumber } from '$lib/utilities/clamp';
  import Formatter from '$lib/utilities/formatter';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import SongInfoSheet from './_components/song-info-sheet.svelte';

  export let data: PageData;

  $: ({ session } = data);

  let foreground: HTMLDivElement;
  let backgroundOpacity: number = 1;

  const song = data.song;
  const platforms = song.streamLinks.map((x) => resolvePlatform(x));

  setPageHeaderTitle(song.title);

  function getTextColor(platform: Platform) {
    return platform.brightColor ? '#000' : '#fff';
  }

  function getScrollProgress() {
    const availableScroll = foreground.scrollHeight - foreground.clientHeight;
    const scrollProgress = clampNumber(foreground.scrollTop / availableScroll, 0, 1);
    return scrollProgress;
  }

  function getScrollBackgroundOpacity() {
    // The max amount that the background can be dimmed
    const minOpacity = 0.5;
    const foregroundOpacity = 1 - getScrollProgress() * (1 - minOpacity);
    return foregroundOpacity;
  }

  onMount(() => {
    foreground.addEventListener('scroll', () => {
      backgroundOpacity = getScrollBackgroundOpacity();
    });
  });
</script>

<svelte:head>
  <title>{data.song.title} | Elluzion</title>
</svelte:head>

<div class="!p-0 !mt-0 content-wrapper rounded-t-3xl overflow-hidden">
  <!-- Blurry background -->
  <div
    style="opacity: {backgroundOpacity};"
    class="pb-12 pointer-events-none content-width h-contentDvh"
  >
    <img
      src={song.artUrl}
      alt="art"
      class="w-full h-[600px] blur-3xl"
      style="mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);
      -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%,rgba(0,0,0,0) 100%);"
    />
  </div>
  <!-- Foreground -->
  <div
    bind:this={foreground}
    class="fixed overflow-auto -translate-y-full content-width h-contentDvh !pb-[88px] xs:!pb-[104px]"
  >
    <!-- TOP -->
    <div class="flex flex-col items-center justify-center gap-8 h-[450px]">
      <img
        src={song.artUrl.replace('large', 't500x500')}
        alt="art"
        class="shadow-2xl w-52 h-52 rounded-2xl"
      />
      <div class="flex flex-col items-center w-full gap-4 px-4 drop-shadow-xl">
        <h3 class="w-full text-3xl font-semibold tracking-tight text-center truncate">
          {song.title}
        </h3>
        <p class="w-full font-medium text-center truncate opacity-70">
          {Formatter.joinList(song.artists, true)}
        </p>
      </div>
    </div>
    <!-- BUTTONS -->
    <div class="flex flex-col items-stretch justify-center gap-2 px-4">
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
      {#if session}
        <SpacerHandle light={true} />
        <Button
          class="flex gap-2 truncate shadow-xl h-14"
          on:click={() => goto(`/songs/${song.permalink}`)}
          ><MaterialSymbol class="text-background">edit</MaterialSymbol> Edit</Button
        >
      {/if}
    </div>
  </div>

  <!-- Infosheet -->
  <SongInfoSheet {song} />
</div>
