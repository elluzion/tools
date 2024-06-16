<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { getFormStore } from '../../stores';

  const store = getFormStore();

  const handleBackClicked = () => {
    $store.page.current -= 1;
  };

  const handleNextClicked = () => {
    if ($store.page.current !== $store.page.total) {
      $store.page.current += 1;
    } else {
      // Submit form
      $store.form.submit();
    }
  };
</script>

<div class="flex *:grow gap-2">
  {#if $store.page.current > 1}
    <Button variant={'secondary'} on:click={handleBackClicked}>Back</Button>
  {/if}
  <Button on:click={handleNextClicked}>Next</Button>
</div>
