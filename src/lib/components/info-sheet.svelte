<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';
  import MaterialSymbol from './material-symbol.svelte';

  let isMounted = false;
  let isExpanded = false;
  let previewContent: HTMLDivElement;
  let content: HTMLDivElement;

  let previewWidth = 0;
  let expandedHeight = 0;

  $: expandedClass = isExpanded ? 'expanded' : '';

  //#region Public functions
  export function toggleShow() {
    updateContentHeight();
    isExpanded = !isExpanded;
  }
  //#endregion

  //#region Private functions
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

  function updateContentHeight() {
    expandedHeight =
      expandedContentHeight() /* Expanded Content */ + 8 /* PaddingBottom */ + 8; /* PaddingTop */
  }
  //#endregion

  //#region Hook
  onMount(() => {
    updatePreviewWidth();

    // Update content height on resize
    window.onresize = updateContentHeight;

    // If component has been mounted, fade the container in
    isMounted = true;

    // Move container to body to enable fixed scrolling
    const container = document.querySelector('#infoSheetContainer');
    const body = document.querySelector('body');
    if (container && body) {
      body.appendChild(container);
    }
  });
  //#endregion
</script>

<!-- Info Sheet Container -->
<div id="infoSheetContainer" class={isMounted ? 'opacity-100' : 'opacity-0'}>
  <!-- Info Sheet -->
  <div
    id="infoSheet"
    style="
      {isExpanded ? '' : `width: ${previewWidth}px;`}
      {isExpanded ? `height: ${expandedHeight}px` : ''};
      transition-delay: {isExpanded ? 0 : 150}ms"
    class={expandedClass}
  >
    <!-- Content -->
    <div
      id="content"
      bind:this={content}
      style="opacity: {isExpanded ? 1 : 0}; transition-delay: {!isExpanded ? 0 : 150}ms;"
      class={expandedClass}
    >
      <slot />
    </div>
    <!-- Preview -->
    <div id="preview" class={expandedClass}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        id="previewContent"
        style="transition-delay: {isExpanded ? 0 : 150}ms;"
        class={expandedClass}
        bind:this={previewContent}
        on:click={() => {
          if (!isExpanded) toggleShow();
        }}
      >
        <slot name="preview" />
      </div>
      <Button
        on:click={() => toggleShow()}
        variant="secondary"
        size="icon"
        class="rounded-full bg-elevation-2 {isExpanded &&
          'rotate-180'} transition-transform duration-300"
      >
        <MaterialSymbol>keyboard_arrow_up</MaterialSymbol>
      </Button>
    </div>
  </div>
</div>

<style lang="postcss">
  /* Info Sheet */

  #infoSheetContainer {
    @apply fixed inset-0 z-40 flex items-end justify-center w-screen overflow-hidden delay-200 transition-opacity pointer-events-none p-4 xs:p-6 h-dvh;
  }
  #infoSheet {
    @apply flex p-2 rounded-[28px] items-end bg-elevation-1 duration-300 transition-all h-14 shadow-2xl pointer-events-auto overflow-hidden;

    &.expanded {
      @apply w-full md:w-[500px];
    }
  }

  #preview {
    @apply flex w-full items-center gap-4 pl-4;

    &.expanded {
      @apply justify-end;
    }
  }

  #previewContent {
    @apply blur-0 grow select-none transition-all duration-200;

    &.expanded {
      @apply opacity-0 translate-y-5 blur-md;
    }
  }

  #content {
    @apply absolute flex flex-col transition-opacity p-4 h-min duration-300 gap-2 pointer-events-none select-none;
    @apply w-[calc(100%-32px-16px)] xs:w-[calc(100%-48px-16px)] md:w-[calc(500px-16px)];

    &.expanded {
      @apply pointer-events-auto select-auto;
    }
  }
</style>
