import { Page } from '@playwright/test';

/**
 * HomePage page object exposes navigation helpers and common locators
 * for validating the site's main landing page UI.
 */
export class HomePage {
  /**
   * Construct a HomePage helper.
   * @param page Playwright Page instance used to query and interact with the UI.
   */
  constructor(private page: Page) {}

  /**
   * Navigate to the application's root (home) page.
   */
  async navigate() {
    // Navigate to base URL
    await this.page.goto('/');
  }

  /**
   * Return a locator for a top navigation link by its visible name.
   * @param name Visible link text to match exactly.
   */
  navLink(name: string) {
    return this.page.getByRole('link', { name, exact: true });
  }

  /**
   * Return a locator for a section identified by its id attribute.
   * @param id The id attribute of the section (e.g. 'rooms', 'booking').
   */
  section(id: string) {
    return this.page.locator(`#${id}`);
  }

  /**
   * Locator for all room card elements on the home page.
   */
  get roomCards() {
    return this.page.locator('.room-card');
  }

  /**
   * Locator for the footer (contentinfo) region.
   */
  get footer() {
    return this.page.getByRole('contentinfo');
  }
}