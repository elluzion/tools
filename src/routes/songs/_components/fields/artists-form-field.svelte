<script lang="ts">
  import MaterialSymbol from '$lib/components/material-symbol.svelte';
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { slide } from 'svelte/transition';
  import { getFormStore } from '../../stores';

  const formStore = getFormStore();

  $: form = $formStore.form;
  $: formData = $formStore.form.form;

  let addArtistValue: string;

  function addArtist() {
    if (!addArtistValue) return;
    if (!$formData.artists.includes(addArtistValue)) {
      $formData.artists = [...$formData.artists, addArtistValue];
    }
    addArtistValue = '';
  }

  function removeArtist(index: number) {
    $formData.artists = $formData.artists.filter((_, i) => i !== index);
  }
</script>

<Form.Field {form} name="artists">
  <Form.Control let:attrs>
    <div class="flex justify-between pt-2">
      <Form.Label>Artists</Form.Label>
      <span class="font-mono text-sm text-muted-text">{$formData.artists.length}</span>
    </div>
    <div class="hidden flex-wrap gap-2 has-[a]:flex">
      {#each $formData.artists as artist, i}
        <div transition:slide>
          <Badge variant="secondary" class="gap-2">
            {artist}
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a
              type="button"
              href="javascript:void(0)"
              class="flex justify-center cursor-pointer"
              on:click={() => removeArtist(i)}
            >
              <MaterialSymbol class="text-[20px]">close</MaterialSymbol>
            </a>
          </Badge>
        </div>
      {/each}
    </div>
    <div class="flex gap-2">
      <Input
        {...attrs}
        on:keydown={(e) => e.key === 'Enter' && addArtist()}
        bind:value={addArtistValue}
        placeholder="Name"
        class="w-auto grow"
      />
      <Button size="icon" class="w-12 h-12" on:click={addArtist}>
        <MaterialSymbol class="text-background">add</MaterialSymbol>
      </Button>
    </div>
  </Form.Control>
  <Form.FieldErrors />
</Form.Field>
