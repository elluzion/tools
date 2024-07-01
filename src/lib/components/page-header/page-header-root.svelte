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

<div class="fixed z-50 flex justify-center w-full h-16 p-4 lg:px-0 bg-background">
  <div class="flex flex-row items-center justify-between gap-2 content-width">
    <!-- svelte-ignore a11y-missing-content -->
    <a
      class="button__styled hover:bg-accent"
      href="/"
      style="background-image: url({homeButtonIconUrl});"
    ></a>
    <span class="ml-2 font-mono text-sm font-semibold truncate grow">{$PageHeaderTitle}</span>
    <a
      class="{!isHome
        ? 'opacity-0 pointer-events-none -translate-y-4 '
        : ''}button__styled hover:bg-accent"
      href="/tools"
    >
      <MaterialSymbol>home_repair_service</MaterialSymbol>
    </a>
    {#if isLoggedIn}
      <a
        class="{!isHome
          ? 'opacity-0 pointer-events-none -translate-y-4 '
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
    @apply border grow-0 flex justify-center items-center w-10 h-10 transition-colors rounded-md;
  }
</style>
