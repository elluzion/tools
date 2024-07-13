<script lang="ts">
  import DownloadBadge from '$lib/components/download-badge.svelte';
  import InfoSheet from '$lib/components/info-sheet.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import type { Song } from '$lib/types/song.js';
  import Formatter from '$lib/utilities/formatter';

  export let song: Song;

  let downloadCount = song.downloadLinks.length;

  $: downloadFormats = () => {
    const formats = song.downloadLinks.map((link) => link.format);
    const uniqueFormats = new Set(formats);
    return Array.from(uniqueFormats);
  };
</script>

<InfoSheet>
  <div slot="preview" class="flex items-center justify-center gap-3" role="button">
    {#if song.releaseDate}
      <span>📅</span>
    {/if}
    {#if song.tempo}
      <span>🐢</span>
    {/if}
    {#if song.key}
      <span>🎹</span>
    {/if}
    {#if song.genre}
      <span>✨</span>
    {/if}
    {#if song.label}
      <span>💿</span>
    {/if}
    {#if downloadCount > 0}
      <Badge variant="secondary" class="flex gap-2 truncate pointer-events-none">
        <span>📂</span>
        <span class="text-sm text-muted-text">
          {downloadFormats().join('/')}
        </span>
      </Badge>
    {/if}
  </div>
  <div class="flex flex-col gap-3 *:font-mono *:text-muted-text">
    {#if song.releaseDate}
      <span>📅 {Formatter.formatDate(song.releaseDate)}</span>
    {/if}
    {#if song.tempo}
      <span>🐢 {song.tempo}BPM</span>
    {/if}
    {#if song.key}
      <span>🎹 {song.key}</span>
    {/if}
    {#if song.genre}
      <span>✨ {song.genre}</span>
    {/if}
    {#if song.label}
      <span>💿 {song.label}</span>
    {/if}
    {#if downloadCount > 0}
      <span>📂 {Formatter.joinList(downloadFormats(), true)} </span>
      <div class="flex flex-wrap gap-2 pt-1">
        {#each song.downloadLinks as downloadLink}
          <DownloadBadge {downloadLink} />
        {/each}
      </div>
    {/if}
  </div>
</InfoSheet>
