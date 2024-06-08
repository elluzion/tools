<script lang="ts">
  import { goto } from '$app/navigation';
  import Card from '$lib/components/card.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Song } from '$lib/types/song';
  import Formatter from '$lib/utilities/formatter';

  export let song: Song;
</script>

<Card class="flex flex-col gap-4">
  <div class="gap-2 w-[calc(100%-72px)]">
    <h5 class="text-xl font-semibold truncate">{song.title}</h5>
    <p class="font-medium truncate text-muted-text">{Formatter.joinList(song.artists)}</p>
  </div>
  <div>
    <Badge variant="secondary" class="truncate pointer-events-none">{song.genre}</Badge>
    <Badge variant="outline" class="truncate pointer-events-none">
      {Formatter.formatDate(song.releaseDate, false)}
    </Badge>
  </div>
  <Button on:click={() => goto(song.permalink)}>Stream</Button>
  <img
    src={song.artUrl}
    alt="Song cover blur"
    class="absolute w-16 h-16 rounded-lg select-none right-5 blur-3xl saturate-200"
  />
  <img
    src={song.artUrl}
    alt="Song cover"
    class="absolute w-16 h-16 rounded-lg select-none right-5"
  />
</Card>
