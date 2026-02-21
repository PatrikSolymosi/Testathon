import { test, expect } from '@playwright/test';

/**
 * Test: Fill and submit contact form with assertions.
 * Steps:
 *  - Open home page
 *  - Locate contact form fields and the submit button
 *  - Assert visibility and initial empty values
 *  - Fill the form with valid data
 *  - Submit the form and assert the success confirmation
 */
test('Fill and submit contact form with assertions', async ({ page }) => {
  // Navigate to the site root where the contact form is available
  await page.goto('/');

  // Find inputs by test id to make the selectors resilient to UI changes
  const nameInput = page.getByTestId('ContactName');
  const emailInput = page.getByTestId('ContactEmail');
  const phoneInput = page.getByTestId('ContactPhone');
  const subjectInput = page.getByTestId('ContactSubject');
  const messageTextarea = page.getByTestId('ContactDescription');
  const submitButton = page.getByRole('button', { name: 'Submit' });

  // Verify all form controls are visible and the submit button is enabled
  await expect(nameInput).toBeVisible();
  await expect(emailInput).toBeVisible();
  await expect(phoneInput).toBeVisible();
  await expect(subjectInput).toBeVisible();
  await expect(messageTextarea).toBeVisible();
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();

  // Inputs should be empty before user interaction
  await expect(nameInput).toHaveValue('');
  await expect(emailInput).toHaveValue('');
  await expect(phoneInput).toHaveValue('');
  await expect(subjectInput).toHaveValue('');
  await expect(messageTextarea).toHaveValue('');

  // Test payload used to fill and submit the contact form
  const formData = {
    name: 'John Doe',
    email: 'john.doe@test.com',
    phone: '+36123456789',
    subject: 'Test Subject',
    message: 'This is a test message sent by Playwright automation.'
  };

  // Fill each field and assert the entered values
  await nameInput.fill(formData.name);
  await emailInput.fill(formData.email);
  await phoneInput.fill(formData.phone);
  await subjectInput.fill(formData.subject);
  await messageTextarea.fill(formData.message);

  await expect(nameInput).toHaveValue(formData.name);
  await expect(emailInput).toHaveValue(formData.email);
  await expect(phoneInput).toHaveValue(formData.phone);
  await expect(subjectInput).toHaveValue(formData.subject);
  await expect(messageTextarea).toHaveValue(formData.message);

  // Submit the form
  await submitButton.click();

  // Success confirmation: heading containing user's name and the submitted subject
  const successHeading = page.getByRole('heading', {
    name: `Thanks for getting in touch ${formData.name}!`
  });

  const successSubject = page.getByText(formData.subject, { exact: true });

  // Assert the success UI elements are visible after submit
  await expect(successHeading).toBeVisible();
  await expect(successSubject).toBeVisible();
});