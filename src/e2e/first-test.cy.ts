/// <reference types="cypress" />

interface BookingData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

Cypress.on('uncaught:exception', (err, runnable) => {
    // Megakadályozza, hogy a Cypress elbukjon az alkalmazás hibái miatt
    return false;
});

describe('Room Booking Section', () => {



    beforeEach(() => {
        cy.visit('/');
    });

    it('should successfully book a room with valid details', () => {
        const validUser: BookingData = {
            firstName: 'testFirstName',
            lastName: 'testLastName',
            email: 'test@test.com',
            phone: '+3685142536'
        };

        // 1. Gördülés a szobákhoz és a konkrét "Book now" gomb megnyomása
        // A HTML alapján a kártyák alján vannak a gombok
        cy.get('#rooms .card').contains('Single').parents('.card').find('a').contains('Book now').click();

        // 2. A naptár betöltése után (a naptár gombja gyakran 'open booking calendar' vagy hasonló)
        // Ha a "Book now" után rögtön a naptár jön:
        cy.get('.rbc-calendar').should('be.visible');

        // Időpont kiválasztása drag-and-drop szerűen vagy két kattintással
        // Fontos: Az eq(15) és eq(17) jó, de a .rbc-day-bg a háttér, próbáljuk meg a cellát
        cy.get('.rbc-day-bg').eq(15).click();
        cy.get('.rbc-day-bg').eq(17).click({ force: true }); // Force kellhet, ha a React réteg rácsúszik

        // 3. Adatok kitöltése - A te HTML-edben 'firstname' és 'lastname' (kisbetűvel) vannak az inputok
        cy.get('input[name="firstname"]').type(validUser.firstName);
        cy.get('input[name="lastname"]').type(validUser.lastName);
        cy.get('input[name="email"]').type(validUser.email);
        cy.get('input[name="phone"]').type(validUser.phone);

        // 4. Foglalás gomb (a form alján)
        cy.contains('button', 'Book').click();

        // 5. Visszaigazolás
        cy.get('.confirmation-modal').should('be.visible'); // Vagy amilyen osztályt kapsz sikernél
        cy.contains('button', 'Close').click();
    });

    it.only('should handle negative scenario with already booked or unavailable slots', () => {
        const user: BookingData = {
            firstName: 'testFirstName',
            lastName: 'testLastName',
            email: 'test@test.com',
            phone: '+3684523694'
        };

        cy.contains('button', 'Check Availability').click();
        cy.get('a').contains('Book now').eq(1).click();

        // Megbizonyosodunk róla, hogy az Unavailable jelzés látható
        cy.contains('Unavailable').should('be.visible').click();

        cy.contains('button', 'Reserve Now').click();

        // Kitöltés
        cy.get('input[name="firstname"]').type(user.firstName);
        cy.get('input[name="lastname"]').type(user.lastName);
        cy.get('input[name="email"]').type(user.email);
        cy.get('input[name="phone"]').type(user.phone);

        cy.get('button').contains('Reserve Now').click();

        // Ellenőrizzük a visszatérést
        cy.contains('Return home').click();
        cy.url().should('include', 'testathon.hu');
    });

    it('should display validation errors for invalid input data', () => {
        const invalidUser: BookingData = {
            firstName: '@ test_test ',
            lastName: '!%',
            email: 'test-test.com', // Rossz formátum
            phone: '12345678'      // Túl rövid
        };

        cy.contains('button', 'Check Availability').click();
        cy.get('a').contains('Book now').first().click();

        // Időpont választás a naptárban
        cy.get('.rbc-day-bg').first().click();
        cy.contains('button', 'Reserve Now').click();

        // Form kitöltése hibás adatokkal
        cy.get('input[name="firstname"]').type(invalidUser.firstName);
        cy.get('input[name="lastname"]').type(invalidUser.lastName);
        cy.get('input[name="email"]').type(invalidUser.email);
        cy.get('input[name="phone"]').type(invalidUser.phone);

        cy.get('button').contains('Reserve Now').click();

        // Assertions: Hibaüzenetek ellenőrzése
        cy.get('.alert-danger').should('be.visible').and(($alerts) => {
            const texts = $alerts.map((i, el) => Cypress.$(el).text()).get();
            expect(texts).to.include('size must be between 3 and 30');
            expect(texts).to.include('size must be between 11 and 21');
            expect(texts).to.include('must be a well-formed email address');
        });
    });
});