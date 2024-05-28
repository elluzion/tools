<!--
  This component is a header for the main page.
  The page title is set through the headerTitle store.
-->
<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/ui/button/button.svelte';
  import { PageHeaderTitle } from './store';
  const homeButtonIconUrl = '/icons/elluzion_small_icon.svg';
</script>

<div class="fixed flex justify-center w-full h-16 p-4 md:px-0 bg-background">
  <div class="w-full md:w-[736px] flex flex-row gap-4 items-center justify-between">
    <Button
      on:click={() => goto('/')}
      size="icon"
      style="background-image: url({homeButtonIconUrl});"
      variant="ghost"
    ></Button>
    <span class="font-mono text-sm font-bold grow">{$PageHeaderTitle}</span>
    <Button size="icon" variant="outline"
      ><span class="material-symbols-outlined"> home_repair_service </span></Button
    >
  </div>
</div>
