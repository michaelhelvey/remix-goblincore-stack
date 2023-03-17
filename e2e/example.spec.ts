import { test, expect } from '@playwright/test'

test('hello world', async ({ page }) => {
	await page.goto('/')

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/new remix app/i)

	// Expect an element "to be visible".
	await expect(page.locator('text=Hello, world')).toBeVisible()
})
