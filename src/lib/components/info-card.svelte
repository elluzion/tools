<script>
  import Card from './card.svelte';
  import MaterialSymbol from './material-symbol.svelte';
</script>

<Card class="flex !p-5 gap-5 *:text-muted-text">
  <MaterialSymbol>info</MaterialSymbol>
  <p class="font-mono">
    <slot />
  </p>
</Card>
