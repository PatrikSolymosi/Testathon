import { test, expect } from '@playwright/test';
import { BookingPage } from './classes/BookingData';
import { BookingDataInterface } from './interfaces/BookingData';

/**
 * Booking flow tests covering positive and negative scenarios.
 * These tests use the `BookingPage` page object to keep the steps clear.
 */
test.describe('Booking Flow Tests', () => {
  let bookingPage: BookingPage;

  test.beforeEach(async ({ page }) => {
    // Create a fresh page object for each test
    bookingPage = new BookingPage(page);
    await bookingPage.navigate();
  });

  test('Positive booking flow', async () => {
    // Valid booking payload used to complete a reservation
    const validUser: BookingDataInterface = {
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      email: 'test@test.com',
      phone: '+3685142536',
    };

    await test.step('Start booking process', async () => {
      // Open booking for the second room and select a date
      await bookingPage.startBooking(1);
      await bookingPage.selectFirstAvailableDate();
      await bookingPage.clickReserve();
    });

    await test.step('Fill booking form', async () => {
      // Fill form and submit to complete reservation
      await bookingPage.fillBookingForm(validUser);
      await bookingPage.clickReserve();
    });

    // Return to home after successful booking
    await bookingPage.returnHome();
  });

  test('Negative booking - invalid email', async () => {
    // Invalid email should produce a validation error alert
    const invalidEmailUser: BookingDataInterface = {
      firstName: 'TestFirstName',
      lastName: 'TestLastName',
      email: 'invalid-email',
      phone: '+3684523694',
    };

    await bookingPage.startBooking(1);
    await bookingPage.selectFirstAvailableDate();
    await bookingPage.clickReserve();
    await bookingPage.fillBookingForm(invalidEmailUser);
    await bookingPage.clickReserve();

    // Expect a specific email validation message to appear
    await expect(bookingPage.errorAlert()).toContainText('must be a well-formed email address');
  });

  test('Negative booking validation - multiple field errors', async () => {
    // Multiple invalid fields to assert several validation messages
    const invalidUser: BookingDataInterface = {
      firstName: '@ test_test ',
      lastName: '!%',
      email: 'test-test.com',
      phone: '12345678',
    };

    await bookingPage.startBooking();
    await bookingPage.selectFirstAvailableDate();
    await bookingPage.clickReserve();
    await bookingPage.fillBookingForm(invalidUser);
    await bookingPage.clickReserve();

    // Assert multiple validation message fragments are present
    await expect(bookingPage.errorAlert()).toContainText('size must be between 3 and 30');
    await expect(bookingPage.errorAlert()).toContainText('size must be between 11 and 21');
    await expect(bookingPage.errorAlert()).toContainText('must be a well-formed email address');
  });
});