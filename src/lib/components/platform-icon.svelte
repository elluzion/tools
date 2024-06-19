<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  /**
   * The platform to display its icon. Must be one of the platforms of {@link Platforms}
   */
  export let platform: string;

  /**
   * The size of the icon in pixels
   */
  export let size: string = '24';

  /**
   * The fill color of the icon
   */
  export let fill: string | undefined = undefined;

  /**
   * The href to navigate to
   */
  export let href: string | undefined = undefined;

  $: svgContent = '';
  $: platformIconPath = `/res/icons/platforms/${platform}.svg`;
  $: {
    platform;
    getPlatformIconPath();
  }

  function getPlatformIconPath() {
    if (browser) {
      fetch(platformIconPath)
        .then((response) => response.text())
        .then((data) => {
          svgContent = data;
          svgContent = svgContent
            .replace(/width=".*?"/g, `width="${size}"`)
            .replace(/height=".*?"/g, `height="${size}"`);
          if (fill) {
            svgContent = svgContent.replaceAll(
              /fill=".*?"/g,
              `fill="${fill.trim().toLowerCase()}"`,
            );
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }
  onMount(() => {
    getPlatformIconPath();
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<svelte:element this={href ? 'a' : 'span'} {href} {...$$restProps}>
  {@html svgContent}
</svelte:element>
