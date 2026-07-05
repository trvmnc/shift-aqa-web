import {test, expect} from '@playwright/test';

test('Корзина с товаром', async ({page}) => {
    await page.goto('/catalog')
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click()
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click()
    await page.getByTestId('header-cart-button').click();
    await expect.soft(page).toHaveScreenshot('Корзина с товаром.png', {
        fullPage: true,
        mask: [
            page.getByTestId('feedback-captcha-image'),
            page.getByTestId('cart-total-price'),
            page.locator('[data-testid^="catalog-product-price-prod-"]')
        ]
    })
})


test('Пустая корзина', async ({page}) => {
    await page.goto('')
    await page.getByTestId('header-cart-button').click()
    await expect.soft(page).toHaveScreenshot({
        fullPage: true,
        mask: [
            page.getByTestId('feedback-captcha-image'),
            page.getByTestId('cart-total-price'),
            page.locator('[data-testid^="catalog-product-price-prod-"]')
        ]
    })
})