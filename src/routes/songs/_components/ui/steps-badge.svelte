<script>
  import Badge from '$lib/components/ui/badge/badge.svelte';
  import { getFormStore } from '../../stores';

  const store = getFormStore();
</script>

<Badge
  variant="secondary"
  class="text-muted-text tracking-widest {$$restProps.class}"
  {$$restProps}
>
  {$store.page.current}/{$store.page.total}
</Badge>
