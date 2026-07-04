import {test, expect} from '@playwright/test';
import pages from '../data/pages.json';

pages.forEach((testPage: {name: string, url: string}) => {
    test(`Страница ${testPage.name}`, async ({page}) => {

        const width = await page.evaluate(() => window.innerWidth)

        await page.goto(testPage.url);

        if (testPage.url == '') {
            await expect.soft(page.getByTestId('cookie-consent-banner')).toHaveScreenshot('Плашка кук.png')
            await page.getByTestId('cookie-accept-button').click();

            if (width <= 768) {
                await page.getByTestId('header-burger-menu-button').click()
                await expect.soft(page.getByTestId('header-mobile-menu')).toHaveScreenshot('Бургер меню.png')
                await page.getByTestId('header-burger-menu-button').click()

            }
        } else {
            await page.getByTestId('cookie-accept-button').click();
        }

        await expect.soft(page).toHaveScreenshot({
            fullPage: true,
            mask: [
                page.locator('[data-testid^="catalog-product-price-prod-"]'),
                page.getByTestId('feedback-captcha-image')
            ]
        });
    })
});  // не понял суть задания, нужно проверить соответствие скринов сайту? если так,
     // то не понял чем это отличается от того, что на практике делали (от этого кода). 

test('Недостающие страницы', async ({page}) => {
    await page.goto('')
    // скрин faq
    await page.getByTestId('header-nav-link-faq').click()
    await expect.soft(page).toHaveScreenshot('faq.png')

    // скрин акций
    await page.getByTestId('header-nav-link-promotions').click()
    await expect.soft(page).toHaveScreenshot('promotions.png')
})

test('Пустая корзина', async ({page}) => {
    await page.goto('')
    await page.getByTestId('header-cart-button').click()
    await expect.soft(page).toHaveScreenshot({
        fullPage: true,
        mask: [
            page.getByTestId('feedback-captcha-image'),
            page.getByTestId('cart-total-price')
        ]
    })
})

test('Корзина с товаром', async ({page}) => {
    await page.goto('/catalog')
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click()
    await page.getByTestId('catalog-add-to-cart-button-prod-001').click()
    await page.getByTestId('header-cart-button').click();
    await expect.soft(page).toHaveScreenshot('Корзина с товаром.png', {
        fullPage: true,
        mask: [
            page.getByTestId('feedback-captcha-image'),
            page.getByTestId('cart-total-price')
        ]
    })
})

test('FAQ, 1 вопрос раскрыт', async ({page}) => {
    await page.goto('')
    await page.getByTestId('header-nav-link-faq').click()
    
    await page.getByTestId('faq-question-1').click()

    await expect.soft(page).toHaveScreenshot('faq.png')
})

test('FAQ, все вопросы раскрыты', async ({page}) => {
    await page.goto('')
    await page.getByTestId('header-nav-link-faq').click()
    
    // прокликать (открыть) все вопросы из faq
    await page.waitForSelector('[data-testid^="faq-question-"]')
    const faqQuestions = page.locator('[data-testid^="faq-question-"]')
    const count = await faqQuestions.count()
    for (let i = 0; i < count; i++) {
        await faqQuestions.nth(i).click()
    }

    await expect.soft(page).toHaveScreenshot('раскрытый faq.png')
}) // вопросы все раскрывает, но все не попадают на скрин