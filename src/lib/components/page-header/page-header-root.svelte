<!--
  This component is a header for the main page.
  The page title is set through the headerTitle store.
-->
<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import MaterialSymbol from '../material-symbol.svelte';
  import { PageHeaderTitle } from './store';
  const homeButtonIconUrl = '/icons/elluzion_small_icon.svg';
</script>

<div class="fixed z-50 flex justify-center w-full h-16 p-4 lg:px-0 bg-background">
  <div class="flex flex-row items-center justify-between gap-4 content-width">
    <Button
      on:click={() => goto('/')}
      size="icon"
      style="background-image: url({homeButtonIconUrl});"
      variant="ghost"
    ></Button>
    <span class="font-mono text-sm font-semibold truncate grow">{$PageHeaderTitle}</span>
    <Button size="icon" variant="outline"
      ><MaterialSymbol>home_repair_service</MaterialSymbol></Button
    >
  </div>
</div>
