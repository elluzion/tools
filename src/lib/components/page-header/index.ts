import PageHeaderRoot from './page-header-root.svelte';
import { PageHeaderTitle } from './store';

/**
 * The page header component.
 */
const PageHeader = PageHeaderRoot;

/**
 * Sets the title of the page header.
 *
 * @param {string} title - The new title for the page header.
 */
function setPageHeaderTitle(title: string) {
  PageHeaderTitle.set(title);
}

export { PageHeader, setPageHeaderTitle };
