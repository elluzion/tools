<script lang="ts">
  import MaterialSymbol from '$lib/components/material-symbol.svelte';
  import { onMount } from 'svelte';

  /** The title of the card */
  export let title: string;
  /** The subtitle of the card */
  export let subTitle: string;
  /** The symbol of the card, reference: https://fonts.google.com/icons?selected=Material+Symbols+Outlined */
  export let symbol: string;

  let isShowing = false;
  let hasCopied = false;

  // Might error out in debug due to insecure origin settings, should be fine in production
  function handleCopyClicked() {
    navigator.clipboard.writeText(subTitle).then(() => {
      hasCopied = true;
      setTimeout(() => (hasCopied = false), 2000);
    });
  }

  onMount(() => {
    setTimeout(() => (isShowing = true), 50);
  });
</script>

<div class="group {isShowing ? '!opacity-100 !translate-y-0' : ''}" id="container">
  <div class="flex items-center gap-2 font-semibold">
    <MaterialSymbol>{symbol}</MaterialSymbol>
    <span class="sm:text-lg grow">{title}</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      on:click={!hasCopied ? handleCopyClicked : () => {}}
      class="opacity-0 cursor-pointer group-hover:opacity-100 text-muted-text"
    >
      <MaterialSymbol class={hasCopied ? 'text-green-400' : 'text-muted-text'}
        >{hasCopied ? 'check' : 'content_copy'}</MaterialSymbol
      >
    </div>
  </div>
  <span class="font-mono text-muted-text">{subTitle}</span>
</div>

<style lang="postcss">
  #container {
    @apply flex flex-col gap-3 p-4 rounded-lg bg-elevation-1 text-main-text transition-[opacity,transform] ease-out opacity-0 translate-y-4;
  }
</style>
