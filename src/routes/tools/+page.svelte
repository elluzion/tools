<script lang="ts">
  import Card from '$lib/components/card.svelte';
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import type { Tool } from '$lib/types/tools';

  const tools: Tool[] = [
    {
      name: 'Audio analyzer',
      description: 'Receive information about an audio file, such as BPM or key.',
      path: 'analyzer',
    },
  ];

  // Set page title
  setPageHeaderTitle('Tools');
</script>

<svelte:head>
  <title>Tools | Elluzion</title>
</svelte:head>

<div class="flex flex-col gap-2 content-wrapper">
  <div>
    {#each tools as tool}
      <a href="/tools/{tool.path}">
        <Card class="transition-colors hover:bg-elevation-2">
          <span class="text-lg font-medium">
            {tool.name}
          </span>
          <p class="text-muted-text">{tool.description}</p>
        </Card>
      </a>
    {/each}
  </div>
</div>
