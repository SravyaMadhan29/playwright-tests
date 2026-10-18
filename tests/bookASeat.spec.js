const { test, expect } = require('@playwright/test');
const { login } = require('../utils/eventHubLoginHelper');
const { futureDate } = require('../utils/calender');

test("book a seat and validate", async ({ browser }) => {
    const context = await browser.newContext();
    //tes
    const page = await context.newPage();
    const eventTitle = `Test Event ${Date.now()}`;
    const category = "Sports";
    const pricevalue = "100";
    const totalSeats = "50";
    await login(page)
    await expect(page.getByText("Browse Events →")).toBeVisible();
    await page.getByRole("button", { name: 'Admin' }).click();
    await page.getByText("Manage Events").first().click();
    await page.locator("#event-title-input").fill(eventTitle);
    await page.getByPlaceholder("Describe the event…").fill("create an event");
    await page.locator("#category").selectOption(category);
    await page.getByLabel("City").fill("Hyderabad");
    await page.getByLabel("Venue").fill("Stadium");
    await page.getByLabel("Event Date & Time").fill(await futureDate(2));
    await page.getByLabel("Price ($)").fill(pricevalue);
    await page.getByLabel("Total Seats").fill(totalSeats);
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();
    await page.locator("#nav-events").click();
    const allEvents = await page.locator('[data-testid="event-card"]');
    await expect(allEvents.first()).toBeVisible();
    const matchCard = allEvents.filter({ hasText: eventTitle });
    await expect(matchCard).toBeVisible();
    const beforeBooking = await matchCard.getByText(" seats available").textContent();
    console.log(beforeBooking);
    const seatsBeforeBooking = parseInt(beforeBooking.match(/\d+/)[0], 10);
    console.log(seatsBeforeBooking);
    await matchCard.locator("#book-now-btn").click();
    await expect(page.locator("#ticket-count")).toHaveText("1");
    await page.getByLabel("Full Name").fill("test booking");
    await page.locator("#customer-email").fill("test678@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("9876446678");
    await page.locator("#confirm-booking").click();
    await expect(page.locator(".booking-ref")).toBeVisible();
    const bookingRef = await page.locator(".booking-ref").textContent();
    await page.locator("#nav-bookings").click();
    await expect(page.getByText("Clear all bookings")).toBeVisible();
    const allBookingsCards = await page.locator(".booking-ref");
    await allBookingsCards.first().waitFor();
    const myBooking = allBookingsCards.filter({ hasText: bookingRef });
    await expect(myBooking).toBeVisible();
    await expect(page.locator("#booking-id").filter({ hasText: eventTitle }));
    await page.locator("#nav-events").click();
    const allEvents1 = await page.locator('[data-testid="event-card"]');
    await expect(allEvents1.first()).toBeVisible();
    const afterBooking = await allEvents1.filter({ hasText: eventTitle });
    await expect(afterBooking).toBeVisible();
    const afterBookingSeats = await matchCard.getByText(" seats available").textContent();
    console.log(afterBookingSeats);
    const seatsAfterBooking = parseInt(afterBookingSeats.match(/\d+/)[0], 10);
    console.log(seatsAfterBooking);
    await expect(seatsAfterBooking === seatsAfterBooking - 1);
    page.pause();
})

