<script>
  import { slide } from 'svelte/transition';
</script>

<div
  {...$$restProps}
  class="{$$restProps.class} p-3 rounded-full bg-elevation-2"
  transition:slide={{ duration: 100 }}
>
  <slot />
</div>
