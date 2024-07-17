<!--
  This component is a header for the main page.
  The page title is set through the headerTitle store.
-->
<script lang="ts">
  import { page } from '$app/stores';
  import MaterialSymbol from '../material-symbol.svelte';
  import { PageHeaderTitle } from './store';

  const homeButtonIconUrl = '/res/icons/elluzion_small_icon.svg';

  export let isLoggedIn: boolean;

  $: isHome = $page.url.pathname === '/';
</script>

<div class="fixed z-50 flex justify-center w-screen p-4">
  <div
    class="flex flex-row items-center justify-between gap-2 p-2 rounded-full content-width bg-opacity-90 backdrop-blur-3xl bg-elevation-1"
  >
    <!-- svelte-ignore a11y-missing-content -->
    <a
      class="button__styled hover:bg-accent"
      href="/"
      style="background: url({homeButtonIconUrl}) no-repeat center;"
    ></a>
    <span class="ml-2 font-mono text-sm font-semibold truncate grow">{$PageHeaderTitle}</span>
    <a class="{!isHome ? '!hidden ' : ''}button__styled hover:bg-accent" href="/tools">
      <MaterialSymbol>home_repair_service</MaterialSymbol>
    </a>
    {#if isLoggedIn}
      <a
        class="{!isHome
          ? '!hidden '
          : ''}button__styled bg-main-text text-background hover:bg-opacity-85"
        href="/songs/add"
      >
        <MaterialSymbol class="text-background">add</MaterialSymbol>
      </a>
    {/if}
  </div>
</div>

<style>
  .button__styled {
    @apply border grow-0 flex justify-center shrink-0 items-center w-12 h-12 transition-colors rounded-full;
  }
</style>
