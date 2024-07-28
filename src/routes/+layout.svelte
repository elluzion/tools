<script lang="ts">
  import { browser } from '$app/environment';
  import { navigating } from '$app/stores';
  import { PageHeader } from '$lib/components/page-header';
  import Lenis from 'lenis';
  import { onMount } from 'svelte';
  import { Toaster } from 'svelte-french-toast';
  import { Circle } from 'svelte-loading-spinners';
  import '../app.css';

  $: isNav = browser ? $navigating : false;

  onMount(() => {
    // Lenis scroll
    const lenis = new Lenis({
      duration: 0.6,
      easing: (x) => 1 - Math.pow(1 - x, 5),
    });

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
</script>

<Toaster
  position="bottom-center"
  toastOptions={{
    duration: 3000,
    className:
      '!font-mono !font-medium [&>.message]:!text-muted-text !px-6 !py-4 !mb-2 !bg-elevation-2 !rounded-full !flex !gap-2 !shadow-2xl',
  }}
/>
<PageHeader />
{#if isNav}
  <div class="fixed z-50 flex items-center justify-center w-full h-full">
    <Circle size="32" color="#fafafa" unit="px" duration="1s" />
  </div>
{/if}
<div
  style="opacity: {isNav ? 0 : 1};
    pointer-events: {isNav ? 'none' : 'all'};
    scale: {isNav ? 0.99 : 1};
    "
  class="flex justify-center w-screen pt-24 transition-[opacity,scale]"
>
  <slot />
</div>
