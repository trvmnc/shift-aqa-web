import {test, expect} from '@playwright/test';
import pages from '../data/pages.json';

pages.forEach((testPage: {name: string, url: string}) => {
    test(`Соответствие pages.json сайту, ${testPage.name}`, async ({page}) => {

    })
})

test('Недостающие страницы', async ({page}) => {

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
    await expect.soft(page).toHaveScreenshot({
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