<script lang="ts">
  import type { PlatformsType } from '$lib/utilities/platforms';
  import { onMount } from 'svelte';

  /**
   * The platform to display its icon
   */
  export let platform: PlatformsType;

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
  $: platformIconPath = `/icons/platforms/${platform}.svg`;

  onMount(() => {
    fetch(platformIconPath)
      .then((response) => response.text())
      .then((data) => {
        svgContent = data;
        svgContent = svgContent
          .replace(/width=".*?"/g, `width="${size}"`)
          .replace(/height=".*?"/g, `height="${size}"`);
        if (fill) {
          svgContent = svgContent.replaceAll(/fill=".*?"/g, `fill="${fill.trim().toLowerCase()}"`);
        }
      });
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<svelte:element this={href ? 'a' : 'span'} {href} {...$$restProps}>
  {@html svgContent}
</svelte:element>
