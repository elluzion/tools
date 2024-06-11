<script>
  import { browser } from '$app/environment';
  import { invalidate } from '$app/navigation';
  import { navigating } from '$app/stores';
  import { PageHeader } from '$lib/components/page-header';
  import { onMount } from 'svelte';
  import { Toaster } from 'svelte-french-toast';
  import { Circle } from 'svelte-loading-spinners';
  import '../app.css';

  export let data;

  $: ({ session, supabase } = data);
  $: isNav = browser ? $navigating : false;

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth');
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<Toaster
  position="bottom-center"
  toastOptions={{
    duration: 3000,
    className:
      '!font-mono !font-medium [&>.message]:!text-muted-text !px-6 !py-4 !bg-elevation-2 !rounded-full !flex !gap-2 !shadow-2xl',
  }}
/>
<PageHeader isLoggedIn={!!session} />
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
  class="flex justify-center w-screen pt-16 transition-[opacity,scale]"
>
  <slot />
</div>
