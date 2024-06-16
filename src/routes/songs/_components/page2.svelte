<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { getFormStore } from '../stores';
  import ReleaseDatePickerField from './fields/release-date-picker-field.svelte';

  const formStore = getFormStore();

  $: form = $formStore.form;
  $: formData = $formStore.form.form;
</script>

<Form.Field {form} name="title">
  <Form.Control let:attrs>
    <Form.Label>URL</Form.Label>
    <div class="flex items-center gap-2">
      <span>elluzion.co/</span>
      <Input {...attrs} bind:value={$formData.permalink} placeholder="enemy" />
    </div>
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>

<div class="flex gap-2">
  <Form.Field {form} class="w-1/2" name="tempo">
    <Form.Control let:attrs>
      <Form.Label>BPM</Form.Label>
      <Input {...attrs} bind:value={$formData.tempo} placeholder="158" type="number" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} class="w-1/2" name="key">
    <Form.Control let:attrs>
      <Form.Label>Key</Form.Label>
      <Input {...attrs} bind:value={$formData.key} placeholder="E minor" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</div>

<div class="flex gap-2">
  <Form.Field {form} class="w-1/2" name="genre">
    <Form.Control let:attrs>
      <Form.Label>Genre</Form.Label>
      <Input {...attrs} bind:value={$formData.genre} placeholder="Future Bass" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} class="w-1/2" name="label">
    <Form.Control let:attrs>
      <Form.Label>Label</Form.Label>
      <Input {...attrs} bind:value={$formData.label} placeholder="XY Records" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</div>

<div class="flex gap-2">
  <Form.Field {form} class="w-1/2" name="releaseDate">
    <Form.Control let:attrs>
      <Form.Label>Release date</Form.Label>
      <ReleaseDatePickerField />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} class="w-1/2" name="type">
    <Form.Control let:attrs>
      <Form.Label>Type</Form.Label>
      <Input {...attrs} bind:value={$formData.type} placeholder="Remix" />
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
</div>
