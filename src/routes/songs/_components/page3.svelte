<script lang="ts">
  import * as Tabs from '$lib/components/ui/tabs';
  import DownloadlinksTab from './tabs/downloadlinks-tab.svelte';
  import StreamlinksTab from './tabs/streamlinks-tab.svelte';
</script>

<Tabs.Root value="streams" class="flex flex-col gap-4">
  <Tabs.List class="w-min">
    <Tabs.Trigger class="px-4" value="streams">Streaming</Tabs.Trigger>
    <Tabs.Trigger class="px-4" value="downloads">Downloads</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="streams">
    <StreamlinksTab />
  </Tabs.Content>
  <Tabs.Content value="downloads">
    <DownloadlinksTab />
  </Tabs.Content>
</Tabs.Root>
