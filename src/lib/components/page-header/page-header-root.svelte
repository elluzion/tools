<!--
  This component is a header for the main page.
  The page title is set through the headerTitle store.
-->
<script lang="ts">
  import { PageHeaderTitle } from './store';

  const homeButtonIconUrl = '/res/icons/elluzion_small_icon.svg';
</script>

<div class="fixed z-50 flex justify-center w-screen p-4">
  <div class="flex flex-row items-center justify-between gap-2 py-2 rounded-full content-width">
    <!-- svelte-ignore a11y-missing-content -->
    <a
      class="button__styled hover:bg-accent"
      href="/"
      style="background: url({homeButtonIconUrl}) no-repeat center;"
    ></a>
    <span class="font-mono text-sm font-semibold truncate grow">{$PageHeaderTitle}</span>
  </div>
</div>

<style lang="postcss">
  .button__styled {
    @apply grow-0 flex justify-center shrink-0 items-center w-12 h-12 transition-colors rounded-full;
  }
</style>
