<script lang="ts">
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import PlatformIcon from '$lib/components/platform-icon.svelte';
  import LatestReleaseCard from './_components/latest-release-card.svelte';
  import ReleaseItem from './_components/release-item.svelte';

  export let data;
  if (!data.songs) throw new Error('No songs found');
  const songs = data.songs!;
  const socialLinks = data.socialLinks!;

  // Set page title
  setPageHeaderTitle('Home');
</script>

<div class="flex flex-col gap-3 content-wrapper">
  <!-- Header -->
  <div class="flex flex-col">
    <h1 class="text-3xl font-bold tracking-tight">Music</h1>
    <div class="flex items-end justify-between w-full">
      <span class="font-mono text-muted-text">Latest</span>
      <div class="flex gap-4 p-3 border rounded-xl">
        {#each socialLinks as platform}
          <PlatformIcon
            platform={platform.platform}
            href={platform.href}
            target="_blank"
            fill="currentColor"
          />
        {/each}
      </div>
    </div>
  </div>

  <!-- Latest release -->
  <LatestReleaseCard song={songs[0]} />

  <!-- Other songs -->
  {#each songs.slice(1) as song}
    <ReleaseItem {song} />
  {/each}
</div>
