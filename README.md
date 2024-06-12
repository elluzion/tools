# elluzion.co

## Updating types

```bash
supabase gen types typescript --project-id 'PROJECTID' > .\src\lib\types\supabase.ts
```

## Developing

Once you've created a project and installed dependencies with `bun i`, start a development server:

```bash
bun dev

# to expose it on the network
bun dev --host

# or start the server and open the app in a new browser tab
bun dev --open
```

INFO FOR TESTING ON THE NETWORK:
The supabase auth uses WebCrypto, which is not available on insecure origins.
To bypass this problem, enable chrome://flags flag 'Insecure origins treated as secure',
and add the URL to the test environment.

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.
