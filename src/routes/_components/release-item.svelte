<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import type { Song } from '$lib/types/song';
  import Formatter from '$lib/utilities/formatter';

  export let song: Song;
</script>

<a class="flex items-center max-w-full gap-4 py-2 group hover:cursor-pointer" href={song.permalink}>
  <img src={song.artUrl} alt="Art" class="rounded-md w-14 h-14 sm:w-16 sm:h-16" />
  <img
    src={song.artUrl}
    alt="Art"
    class="absolute transition-opacity duration-500 rounded-md opacity-0 w-14 h-14 sm:w-16 sm:h-16 group-hover:opacity-100 blur-2xl -z-10 saturate-200"
  />
  <div class="flex flex-col w-full gap-1">
    <h5 class="text-lg font-semibold tracking-tight">{song.title}</h5>
    <div class="flex items-center w-full gap-2">
      <p class="text-sm text-muted-text xs:text-base text-ellipsis">
        {Formatter.joinList(song.artists)}
      </p>
      <Badge
        variant="secondary"
        class="font-mono text-xs text-muted-text px-2.5 py-1 pointer-events-none h-min text-nowrap"
        >{song.genre}</Badge
      >
    </div>
  </div>
</a>
