<script lang="ts">
  import { cn } from '$lib/utilities/shadcn';
  import { Label as LabelPrimitive } from 'bits-ui';

  type $$Props = LabelPrimitive.Props;
  type $$Events = LabelPrimitive.Events;

  let className: $$Props['class'] = undefined;
  export { className as class };
</script>

<LabelPrimitive.Root
  class={cn(
    'text-xs text-muted-text font-mono uppercase font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    className,
  )}
  {...$$restProps}
  on:mousedown
>
  <slot />
</LabelPrimitive.Root>
