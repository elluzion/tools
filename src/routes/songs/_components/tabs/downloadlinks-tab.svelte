<script lang="ts">
  import SpacerHandle from '$lib/components/spacer-handle.svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';
  import Input from '$lib/components/ui/input/input.svelte';
  import * as Select from '$lib/components/ui/select';
  import type { Song } from '$lib/types/song';
  import type { Selected } from 'bits-ui';
  import { getFormStore } from '../../_lib/song-form-store';
  import DownloadLinkEntry from '../ui/download-link-entry.svelte';

  const formStore = getFormStore();

  $: form = $formStore.form;
  $: formData = $formStore.form.form;

  let url: string | undefined;
  let format: Song['downloadLinks'][0]['format'] | undefined;
  let edit: string | undefined;

  function onFormatSelectChange(v: Selected<unknown> | undefined) {
    let newVal = v?.value as Song['downloadLinks'][0]['format'] | undefined;
    format = newVal;
    return v;
  }

  function addDownloadLink() {
    if (!url || !url.includes('https://') || !format || !edit) return;
    $formData.downloadLinks = [...$formData.downloadLinks, { format, edit, url }];
    url = undefined;
    edit = undefined;
  }
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-col gap-2">
    <Input placeholder="URL" bind:value={url} />
    <div class="flex gap-2">
      <Select.Root onSelectedChange={(v) => onFormatSelectChange(v)}>
        <Select.Trigger class="h-12 w-[100px] shrink-0">
          <Select.Value placeholder="Format" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="mp3">MP3</Select.Item>
          <Select.Item value="wav">WAV</Select.Item>
        </Select.Content>
      </Select.Root>
      <Input bind:value={edit} placeholder="Edit (eg. Extended Mix)" />
    </div>
    <Button on:click={addDownloadLink}>Add</Button>
  </div>
  {#if $formData.downloadLinks.length > 0}
    <SpacerHandle />
  {/if}
  <div class="flex flex-col gap-2">
    {#each $formData.downloadLinks as download}
      <DownloadLinkEntry {download} />
    {/each}
  </div>
  <Form.Field {form} name="downloadLinks">
    <Form.FieldErrors />
  </Form.Field>
</div>
