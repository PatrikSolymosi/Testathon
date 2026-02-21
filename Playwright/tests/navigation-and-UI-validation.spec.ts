import { test, expect } from '@playwright/test';
import { HomePage } from './classes/HomePage';

/**
 * Navigation & UI validation suite.
 * Verifies top-level navigation, sections and critical UI elements on the home page.
 */
test.describe('Navigation & UI Validation', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    // Initialize the page object and open the home page
    home = new HomePage(page);
    await home.navigate();
  });

  test('Navigation validation', async ({ page }) => {
    // Pairs of link text and expected URL hash suffix
    const navigationTargets = [
      { name: 'Rooms', hash: '#rooms' },
      { name: 'Booking', hash: '#booking' },
      { name: 'Amenities', hash: '#amenities' },
      { name: 'Location', hash: '#location' },
      { name: 'Contact', hash: '#contact' },
    ];

    for (const item of navigationTargets) {
      // Click navigation link and assert URL ends with the expected hash
      await home.navLink(item.name).click();
      await expect(page).toHaveURL(new RegExp(`${item.hash}$`));
    }

    // Admin navigates to a separate route (not a hash)
    await home.navLink('Admin').click();
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('UI validation', async ({ page }) => {
    await test.step('Header validation', async () => {
      // Verify site name in navigation and the main heading text
      await expect(page.getByRole('navigation')).toContainText('Shady Meadows B&B');
      await expect(page.getByRole('heading', { level: 1 }))
        .toHaveText('Welcome to Shady Meadows B&B');
    });

    await test.step('Rooms section validation', async () => {
      // Open Rooms section and validate content and cards
      await home.navLink('Rooms').click();

      await expect(home.section('rooms')).toContainText('Our Rooms');

      await expect(home.roomCards).toHaveCount(3);

      const expectedRooms = [
        { title: 'Single', price: '£100', href: /reservation\/1/, img: '/images/room1.jpg' },
        { title: 'Double', price: '£150', href: /reservation\/2/, img: '/images/room2.jpg' },
        { title: 'Suite',  price: '£225', href: /reservation\/3/, img: '/images/room3.jpg' },
      ];

      for (let i = 0; i < expectedRooms.length; i++) {
        const card = home.roomCards.nth(i);

        // Validate title, price, booking link and image src for each card
        await expect(card.locator('.card-title'))
          .toHaveText(expectedRooms[i].title);

        await expect(card).toContainText(expectedRooms[i].price);

        await expect(card.locator('.btn-primary'))
          .toHaveAttribute('href', expectedRooms[i].href);

        await expect(card.locator('img'))
          .toHaveAttribute('src', expectedRooms[i].img);
      }
    });

    await test.step('Booking section validation', async () => {
      // Verify booking section text prompts are present
      await home.navLink('Booking').click();
      await expect(home.section('booking'))
        .toContainText('Check Availability & Book Your Stay');

      await expect(home.section('booking')).toContainText('Check In');
      await expect(home.section('booking')).toContainText('Check Out');
    });

    await test.step('Location section validation', async () => {
      // Validate contact details and location content
      await home.navLink('Location').click();

      await expect(home.section('location')).toContainText('Our Location');
      await expect(home.section('location')).toContainText('Contact Information');
      await expect(home.section('location')).toContainText('012345678901');
      await expect(home.section('location')).toContainText('fake@fakeemail.com');
    });

    await test.step('Contact section validation', async () => {
      // Ensure contact form fields are visible
      await home.navLink('Contact').click();

      const expectedFields = ['Name', 'Email', 'Phone', 'Subject', 'Message'];

      for (const field of expectedFields) {
        await expect(home.section('contact')).toContainText(field);
      }
    });

    await test.step('Footer validation', async () => {
      // Footer should contain brand and useful links
      await expect(home.footer).toContainText('Shady Meadows B&B');
      await expect(home.footer).toContainText('Quick Links');
    });
  });
});