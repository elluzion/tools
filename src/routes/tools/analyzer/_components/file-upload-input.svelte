<script lang="ts">
  import MaterialSymbol from '$lib/components/material-symbol.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher<{ submit: File }>();

  export let isLoading: boolean;
  export let loadingStatusMessage: string;
  export let loadingProgress: number;

  let uploadOverlay: HTMLLabelElement;

  const hoverOverlayClasses = ['!ring-2', '!ring-ring', '!ring-offset-2', '!bg-opacity-100'];

  function handleInputHoverOn() {
    uploadOverlay.classList.add(...hoverOverlayClasses);
  }

  function handleInputHoverOff() {
    uploadOverlay.classList.remove(...hoverOverlayClasses);
  }

  // type validation when file has been selected
  function handleSubmit(file: File) {
    // file input is empty
    if (!file) return;

    // error: file type invalid
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      // toast({
      //   title: 'File type not allowed!',
      //   description: `File has to be of type ${ALLOWED_FILE_TYPES.join(', ')}`,
      // });
      return;
    }

    // all correct
    dispatch('submit', file);
  }

  const ALLOWED_FILE_TYPES = ['audio/wav', 'audio/flac', 'audio/mpeg'];
</script>

<div class="h-28">
  <div class="w-full overflow-hidden rounded-lg pointer-events-none h-28">
    <div
      class="bg-elevation-1 h-28 transition-[width,opacity] duration-300 pointer-events-none"
      style="width: {loadingProgress * 100}%"
    ></div>
  </div>
  <label
    bind:this={uploadOverlay}
    for="fileUpload"
    class="flex flex-col items-center justify-center w-full gap-4 p-6 text-center transition-all bg-opacity-0 rounded-lg bg-elevation-2 ring-border h-28 -translate-y-28 ring-1"
  >
    <div class="flex items-center justify-center gap-2 font-semibold">
      <MaterialSymbol>{isLoading ? 'refresh' : 'upload'}</MaterialSymbol>
      <span>
        {isLoading ? loadingStatusMessage || 'Analyzing' : 'Upload file'}
      </span>
    </div>
    <span class="w-full font-mono text-sm truncate text-muted-text">
      {isLoading ? 'This will take a few seconds' : ALLOWED_FILE_TYPES.join(', ')}
    </span>
  </label>
  <input
    required
    id="fileUpload"
    type="file"
    accept=".mp3,.wav,.flac"
    class="w-full -translate-y-56 opacity-0 cursor-pointer h-28"
    on:mouseenter={() => handleInputHoverOn()}
    on:mouseleave={() => handleInputHoverOff()}
    on:dragenter={() => handleInputHoverOn()}
    on:dragleave={() => handleInputHoverOff()}
    on:drop={() => setTimeout(handleInputHoverOff, 500)}
    on:change={(e) => {
      if (e.currentTarget.files && e.currentTarget.files.length > 0) {
        handleSubmit(e.currentTarget.files[0]);
      }
    }}
  />
</div>
