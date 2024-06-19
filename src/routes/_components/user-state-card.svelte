<script lang="ts">
  import Card from '$lib/components/card.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import type Db from '$lib/shared/db';
  import type { User } from '@supabase/supabase-js';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  export let db: Db;
  let user: User | undefined;
  onMount(async () => {
    user = await db.auth.getUserInfo();
  });
</script>

{#if user}
  <div transition:fade={{ duration: 200 }}>
    <Card>
      <div class="flex flex-col gap-4">
        <p class="font-bold">User status</p>

        <ul class="*:font-mono *:text-muted-text list-disc list-inside">
          <li>Name: {user?.user_metadata.full_name}</li>
          <li>Mail: {user?.email}</li>
        </ul>

        <Button on:click={() => db.auth.signOut()} variant="secondary" class="font-mono font-bold">
          Logout
        </Button>
      </div>
    </Card>
  </div>
{/if}
