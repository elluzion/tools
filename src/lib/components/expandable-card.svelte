<script lang="ts">
  import Card from '$lib/components/card.svelte';
  import MaterialSymbol from './material-symbol.svelte';
  import { Button } from './ui/button';

  export let expanded = true;
  export let title = 'Title';

  const collapsedHeight = 64;
  let content: HTMLDivElement;

  $: expandedHeight = 64 + 16 + content?.offsetHeight ?? 0;
</script>

<Card
  {...$$restProps}
  class="flex flex-col gap-4 transition-[height] duration-200 {$$restProps.class}"
  style="height: {expanded ? expandedHeight : collapsedHeight}px;{$$restProps.style}"
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="flex h-6 cursor-pointer" on:click={() => (expanded = !expanded)}>
    <p class="font-bold grow">{title}</p>
    <Button
      class="relative flex justify-end h-6 px-0 transition-transform rounded-full hover:bg-elevation-1"
      variant="ghost"
      style="transform: rotate({expanded ? 180 : 0}deg);"
      ><MaterialSymbol>keyboard_arrow_down</MaterialSymbol>
    </Button>
  </div>
  <div
    bind:this={content}
    class="flex flex-col gap-4 transition-opacity"
    style="opacity: {expanded ? 1 : 0}; pointer-events: {expanded ? 'all' : 'none'};"
  >
    <slot />
  </div>
</Card>
