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

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.
