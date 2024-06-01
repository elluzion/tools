<script lang="ts">
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import type { DownloadLink } from '$lib/types/song';

  export let downloadLink: DownloadLink;
</script>

<Badge
  variant="secondary"
  class="gap-2 cursor-pointer pr-1.5 font-sans text-main-text"
  href={downloadLink.url}
  target="_blank"
  >{downloadLink.edit}
  <span
    class="rounded-full bg-elevation-1 h-[22px] justify-center items-center text-xs px-2 py-2 font-mono text-muted-text flex"
    >{downloadLink.format}</span
  ></Badge
>
