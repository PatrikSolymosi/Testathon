import { Page } from '@playwright/test';

/**
 * BookingPage helper encapsulates actions and selectors used
 * during the booking flow in the application under test.
 * The class follows the Page Object pattern to keep tests readable.
 */
export class BookingPage {
  /**
   * Create a new BookingPage.
   * @param page Playwright Page instance used to perform UI actions.
   */
  constructor(private page: Page) {}

  /**
   * Navigate to the application's root (home) page.
   */
  async navigate() {
    // Go to base URL configured for Playwright
    await this.page.goto('/');
  }

  /**
   * Start the booking process by opening the availability widget
   * and clicking the "Book now" link for a given room index.
   * @param index Zero-based index selecting which room's "Book now" link to click.
   */
  async startBooking(index: number = 0) {
    // Open the availability panel
    await this.page.getByRole('button', { name: 'Check Availability' }).click();
    // Click the requested "Book now" link for the room
    await this.page.getByRole('link', { name: 'Book now' }).nth(index).click();
  }

  /**
   * Select the first available date in the calendar widget.
   */
  async selectFirstAvailableDate() {
    // Choose the first available date cell
    await this.page.locator('.rbc-row-bg div').first().click();
  }

  /**
   * Click the primary reserve button to advance reservation steps.
   */
  async clickReserve() {
    await this.page.getByRole('button', { name: 'Reserve Now' }).click();
  }

  /**
   * Fill the booking form with provided user data.
   * @param data Object containing booking form fields.
   */
  async fillBookingForm(data: BookingDataInterface) {
    // Fill the four text inputs used in the reservation form
    await this.page.getByRole('textbox', { name: 'Firstname' }).fill(data.firstName);
    await this.page.getByRole('textbox', { name: 'Lastname' }).fill(data.lastName);
    await this.page.getByRole('textbox', { name: 'Email' }).fill(data.email);
    await this.page.getByRole('textbox', { name: 'Phone' }).fill(data.phone);
  }

  /**
   * Return to the home page using the "Return home" link in the UI.
   */
  async returnHome() {
    await this.page.getByRole('link', { name: 'Return home' }).click();
  }

  /**
   * Locator for an error alert shown when booking validation fails.
   * @returns Playwright Locator for the danger alert element.
   */
  errorAlert() {
    return this.page.locator('.alert.alert-danger');
  }
}