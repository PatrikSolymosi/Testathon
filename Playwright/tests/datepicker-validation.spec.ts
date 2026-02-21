import { test, expect } from '@playwright/test';

/**
 * Test: Check availability function validation.
 * This test selects a start and end date from the datepicker
 * and triggers the availability check.
 */
test('Check availability function validation', async ({ page }) => {
  // Open the home page containing the datepicker widget
  await page.goto('/');

  // Select the start date using the first textbox (start date input)
  const startDateInput = page.getByRole('textbox').first();
  await startDateInput.click();
  // Choose the specific date option from the datepicker menu
  await page
    .getByRole('option', { name: 'Choose Thursday, 19 February' })
    .click();

  // Select the end date using the second textbox (end date input)
  const endDateInput = page.getByRole('textbox').nth(1);
  await endDateInput.click();
  await page
    .getByRole('option', { name: 'Choose Saturday, 28 February' })
    .click();

  // Click the Check Availability button to perform the search
  const checkAvailabilityButton = page.getByRole('button', {
    name: 'Check Availability',
  });
  await checkAvailabilityButton.click();
});