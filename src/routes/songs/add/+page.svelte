<script lang="ts">
  import { goto } from '$app/navigation';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import toast from 'svelte-french-toast';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Page1 from '../_components/page1.svelte';
  import Page2 from '../_components/page2.svelte';
  import Page3 from '../_components/page3.svelte';
  import BottomControls from '../_components/ui/bottom-controls.svelte';
  import StepsBadge from '../_components/ui/steps-badge.svelte';
  import { songFormSchema } from '../_lib/song-form';
  import { initFormStore } from '../_lib/song-form-store';

  export let data;

  const superform = superForm(data.form, {
    validators: zodClient(songFormSchema),
    multipleSubmits: 'prevent',
    dataType: 'json',
    resetForm: false,
    async onSubmit(input) {
      const result = await $formStore.form.validateForm();
      if (!result.valid) {
        const firstErrorInput = Object.keys(result.errors)[0] || 'Check your inputs!';
        const firstErrorMsg = Object.values(result.errors)[0] || 'Check your inputs!';
        toast.error(firstErrorInput + ': ' + firstErrorMsg);
        input.cancel();
      }
    },
    onResult(event) {
      if (event.result.type === 'success') {
        toast.success('Song added!');

        setTimeout(() => {
          goto('/' + $formData.permalink);
        }, 1000);
      }
    },
    onError(error) {
      toast.error(error.result.error.message);
    },
  });

  const formStore = initFormStore(superform);

  $: formData = superform.form;
  $: enhance = $formStore.form.enhance;
  $: formPageIndex = $formStore.page.current;

  setPageHeaderTitle('Add song');
</script>

<svelte:head>
  <title>Add song</title>
</svelte:head>

<div class="{'content-wrapper'} flex flex-col gap-3 h-contentDvh !px-0 !mt-0">
  <StepsBadge class="ml-4 pointer-events-none w-min" />
  <div class="flex flex-col w-full px-4 overflow-y-scroll h-contentDvh">
    <form method="POST" action="?/add" use:enhance>
      {#if formPageIndex === 1}
        <Page1 />
      {:else if formPageIndex === 2}
        <Page2 />
      {:else if formPageIndex === 3}
        <Page3 />
      {/if}
    </form>
  </div>
  <div class="px-4">
    <BottomControls />
  </div>
</div>
