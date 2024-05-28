<script>
  import { PageHeader } from '$lib/components/page-header';
  import '../app.css';
</script>

<div>
  <PageHeader />
  <div class="fixed flex justify-center w-full pt-16">
    <slot />
  </div>
</div>
