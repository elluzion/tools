<script lang="ts">
  import { fade } from 'svelte/transition';

  export let light: boolean = false;
</script>

<div class="flex justify-center" transition:fade={{ duration: 100 }}>
  <span class="w-16 h-1 rounded-full {light ? 'bg-muted-text' : 'bg-elevation-3'}" />
</div>
