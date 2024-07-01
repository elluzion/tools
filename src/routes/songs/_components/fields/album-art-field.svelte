<script>
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { getFormStore } from '../../stores';

  const formStore = getFormStore();

  $: form = $formStore.form;
  $: formData = $formStore.form.form;
</script>

<Form.Field {form} name="artUrl">
  <Form.Control let:attrs>
    <Form.Label>Album cover</Form.Label>
    <div class="flex items-center gap-2">
      <Input {...attrs} bind:value={$formData.artUrl} placeholder="https://..." />
      <img
        src={$formData.artUrl.trim()}
        alt="Album cover"
        class="w-12 h-12 transition-[transform,box-shadow] border shadow-none rounded-md shrink-0 -z-10"
      />
    </div>
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>

<style lang="postcss">
  img {
    &:hover {
      opacity: 0;
    }
  }

  img:before {
    @apply block rounded-md border border-transparent z-0 h-12 w-12;
    content: ' ';
    transform: translate(-1px, -1px);
    background-image: url('/res/icons/album_art_default.svg');
  }
</style>
