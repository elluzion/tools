<script lang="ts">
  export let url: string;
  let show = false;

  $: params = new URLSearchParams({
    url: url,
    color: '#2563eb',
    hide_related: 'true',
    show_comments: 'false',
  }).toString();
</script>

<div class="animate">
  <iframe
    title="Soundcloud Embed"
    width="100%"
    height="114"
    class="rounded-md"
    src={`https://w.soundcloud.com/player/?${params}`}
  />
</div>

<style scoped>
  .animate {
    animation: fadeInAnimation cubic-bezier(0.33, 1, 0.68, 1) 400ms;
    animation-delay: 150ms;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    opacity: 0;
    transform: scale(0.9);
  }

  @keyframes fadeInAnimation {
    from {
      opacity: 0;
      transform: scale(0.9);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
