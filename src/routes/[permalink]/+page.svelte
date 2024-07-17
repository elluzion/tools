<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import MaterialSymbol from '$lib/components/material-symbol.svelte';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import PlatformIcon from '$lib/components/platform-icon.svelte';
  import SpacerHandle from '$lib/components/spacer-handle.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  import { resolvePlatform } from '$lib/shared/platforms.js';
  import type { Platform } from '$lib/types/platform';
  import Formatter from '$lib/utilities/formatter';
  import type { PageData } from './$types';
  import SongInfoSheet from './_components/song-info-sheet.svelte';
  import SoundcloudEmbed from './_components/soundcloud-embed.svelte';

  export let data: PageData;

  $: ({ session, metadata } = data);

  const song = data.song;
  const platforms = song.streamLinks.map((x) => resolvePlatform(x));
  const soundcloudLink = song.streamLinks.find((x) => x.includes('soundcloud'));

  $: isFutureRelease = song.releaseDate > new Date();
  $: daysToRelease = Formatter.getDaysFromNow(song.releaseDate);

  setPageHeaderTitle(song.title);

  function getTextColor(platform: Platform) {
    return platform.brightColor ? '#000' : '#fff';
  }
</script>

<svelte:head>
  <title>{metadata.title} | Elluzion</title>
  <meta name="description" content={metadata.description} />
  <meta property="og:title" content={metadata.title} />
  <meta property="og:type" content="music:song" />
  <meta property="og:url" content={$page.url.pathname} />
  <meta property="og:image" content={metadata.image} />
</svelte:head>

<div id="contentWrapper" class="!p-0 content-wrapper lg:!w-full -mt-24">
  <!-- Foreground -->
  <div
    style="background: url({song.artUrl}) no-repeat center/cover;"
    class="overflow-hidden bg-no-repeat min-h-contentDvh"
  >
    <div
      class="flex flex-col items-center w-full pt-20 min-h-contentDvh backdrop-blur-3xl bg-gradient-to-b from-transparent to-background"
    >
      <!-- TOP -->
      <div class="flex flex-col items-center justify-center gap-8 content-width h-[500px]">
        <img src={song.artUrl} alt="art" class="shadow-2xl w-52 h-52 rounded-2xl" />
        <div class="flex flex-col items-center w-full gap-4 px-4 drop-shadow-xl">
          <h3 class="w-full text-3xl font-semibold tracking-tight text-center line-clamp-2">
            {song.title}
          </h3>
          <p class="w-full font-medium text-center truncate opacity-70">
            {Formatter.joinList(song.artists, true)}
          </p>
          {#if isFutureRelease}
            <Badge
              class="flex gap-3 pointer-events-none bg-opacity-30 text-muted-text"
              variant="secondary"
            >
              upcoming ({daysToRelease}
              {daysToRelease == 1 ? 'day' : 'days'})
            </Badge>
          {/if}
        </div>
      </div>
      <!-- BUTTONS -->
      <div
        class="flex flex-col items-stretch content-width justify-center gap-2 px-4 !pb-[88px] xs:!pb-[104px]"
      >
        {#if soundcloudLink}
          <SoundcloudEmbed url={soundcloudLink} />
          <SpacerHandle light={true} />
        {/if}
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
  </div>
</div>

<!-- Infosheet -->
<SongInfoSheet {song} />
