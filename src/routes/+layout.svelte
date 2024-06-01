<script>
  import { navigating } from '$app/stores';
  import { PageHeader } from '$lib/components/page-header';
  import { Circle } from 'svelte-loading-spinners';
  import '../app.css';
</script>

<PageHeader />
{#if $navigating}
  <div class="fixed z-50 flex items-center justify-center w-full h-full">
    <Circle size="32" color="#fafafa" unit="px" duration="1s" />
  </div>
{/if}
<div
  style="opacity: {$navigating ? 0 : 1};
    pointer-events: {$navigating ? 'none' : 'all'};
    scale: {$navigating ? 0.99 : 1};
    "
  class="flex justify-center w-screen pt-16 transition-all ease-in-out"
>
  <slot />
</div>
