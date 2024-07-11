<script lang="ts">
  import { fade } from 'svelte/transition';

  export let light: boolean = false;
</script>

<div class="flex justify-center" transition:fade={{ duration: 100 }}>
  <span class="w-16 h-0.5 rounded-full {light ? 'bg-muted-text/60' : 'bg-elevation-3'}" />
</div>
