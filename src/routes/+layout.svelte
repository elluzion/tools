<script>
  import '../app.css';
</script>

<slot />

<style>
  :global(body) {
    @apply font-mono bg-background text-text-main;
  }
</style>
