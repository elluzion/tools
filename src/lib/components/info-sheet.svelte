<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';

  let isExpanded = false;
  let previewContent: HTMLDivElement;
  let content: HTMLDivElement;

  let previewWidth = 0;
  let expandedHeight = 0;

  const previewContentWidth = () => {
    try {
      return previewContent.offsetWidth;
    } catch (e) {
      return 0;
    }
  };

  const expandedContentHeight = () => {
    try {
      return content.offsetHeight;
    } catch (e) {
      return 0;
    }
  };

  function toggleShow() {
    expandedHeight =
      expandedContentHeight() /* Expanded Content */ + 8 /* PaddingBottom */ + 8; /* PaddingTop */
    isExpanded = !isExpanded;
  }

  onMount(() => {
    previewWidth =
      previewContentWidth() /* Preview */ +
      40 /* Expand Button width */ +
      24 /* PaddingLeft */ +
      8 /* PaddingRight */ +
      16 /* Gap */;
  });
</script>

<!-- Info Sheet Container -->
<div
  class="fixed inset-0 z-40 flex items-end justify-center w-screen p-6 pointer-events-none h-dvh"
>
  <!-- Info Sheet -->
  <div
    style="
    {isExpanded ? '' : `width: ${previewWidth}px;`}
    {isExpanded ? `height: ${expandedHeight}px` : ''};
    transition-delay: {isExpanded ? 0 : 150}ms"
    class="{isExpanded
      ? 'w-full md:w-[500px]'
      : ''} flex p-2 rounded-[28px] flex-row items-end bg-elevation-1 duration-300 transition-all h-14 shadow-2xl pointer-events-auto overflow-hidden"
  >
    <!-- Content -->
    <div
      bind:this={content}
      style="opacity: {isExpanded ? 1 : 0}; transition-delay: {!isExpanded ? 0 : 150}ms;"
      class="{!isExpanded
        ? 'pointer-events-none select-none'
        : ''} absolute flex transition-opacity p-4 h-min duration-300"
    >
      <slot name="content" />
    </div>
    <!-- Preview -->
    <div class="flex w-full items-center {isExpanded ? 'justify-end' : ''} gap-4 pl-4 ease-in">
      <div
        id="previewContent"
        style="transition-delay: {isExpanded ? 0 : 150}ms;"
        class={isExpanded ? 'expanded' : ''}
        bind:this={previewContent}
      >
        <slot name="preview" />
      </div>
      <Button
        on:click={() => toggleShow()}
        variant="ghost"
        size="icon"
        class="rounded-full bg-elevation-2 {isExpanded &&
          'rotate-180'} transition-transform duration-300"
      >
        <span class="material-symbols-outlined"> keyboard_arrow_up </span>
      </Button>
    </div>
  </div>
</div>

<style>
  #previewContent {
    @apply blur-0 grow select-none transition-all ease-in-out duration-200;
  }
  #previewContent.expanded {
    @apply opacity-0 translate-y-5 blur-md;
  }
</style>
