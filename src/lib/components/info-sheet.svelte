<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';

  let isExpanded = false;
  let previewContent: HTMLDivElement;
  let content: HTMLDivElement;

  let previewWidth = 0;
  let expandedHeight = 0;

  // Public functions
  export function toggleShow() {
    expandedHeight =
      expandedContentHeight() /* Expanded Content */ + 8 /* PaddingBottom */ + 8; /* PaddingTop */
    isExpanded = !isExpanded;
  }

  // Private functions
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

  function updatePreviewWidth() {
    previewWidth =
      previewContentWidth() /* Preview */ +
      40 /* Expand Button width */ +
      24 /* PaddingLeft */ +
      8 /* PaddingRight */ +
      16 /* Gap */;
  }

  // Hook
  onMount(() => {
    updatePreviewWidth();
  });
</script>

<!-- Info Sheet Container -->
<div
  class="fixed inset-0 z-40 flex items-end justify-center w-screen px-4 pb-4 pointer-events-none xs:pb-6 xs:px-6 h-dvh"
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
      <slot />
    </div>
    <!-- Preview -->
    <div class="flex w-full items-center {isExpanded ? 'justify-end' : ''} gap-4 pl-4 ease-in">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        id="previewContent"
        style="transition-delay: {isExpanded ? 0 : 150}ms;"
        class={isExpanded ? 'expanded' : ''}
        bind:this={previewContent}
        on:click={() => {
          if (!isExpanded) toggleShow();
        }}
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
    @apply blur-0 grow select-none transition-all duration-200;
  }
  #previewContent.expanded {
    @apply opacity-0 translate-y-5 blur-md;
  }
</style>
