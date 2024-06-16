<script lang="ts">
  import { setPageHeaderTitle } from '$lib/components/page-header';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  let { supabase, session } = data;

  setPageHeaderTitle('Login');

  async function login() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin + '/login/callback',
      },
    });
    if (error) console.log(error);
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      location.reload();
    }
  }
</script>

<svelte:head>
  <title>Log in | Elluzion</title>
</svelte:head>

<div class="flex flex-col gap-2 content-wrapper">
  <h1>Login</h1>

  {#if session}
    <p>You are already logged in</p>
    <Button on:click={logout}>Logout</Button>
  {:else}
    <Button on:click={login}>Login</Button>
  {/if}
</div>
