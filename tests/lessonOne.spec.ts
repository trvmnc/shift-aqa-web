import {test, expect} from '@playwright/test'
import config from '../playwright.config'

const baseURL = config.use?.baseURL
if (!baseURL) {
    throw new Error('baseURL не задан в config')
}

test('Проверка перехода на главную страницу (title и URL)', async ({page}) => {
    await page.goto('')
    await expect.soft(page).toHaveTitle('Главная')
    await expect.soft(page).toHaveURL(baseURL)          // soft вернёт ошибку, но тест продолится
});

test('Проверка перехода к каталогу (title и URL)', async ({page}) => {
    await page.goto('catalog')
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')
    await expect.soft(page).toHaveURL(`${baseURL}catalog`)          
});

// проверка урла с параметрами
test('Проверка перехода к каталогу (регулярное выражение)', async ({page}) => {
    await page.goto('catalog')
    await expect.soft(page).toHaveURL(/.*catalog/)          
});

// проверка текста в элементе (кнопке)
test('Проверка текста в кнопке перехода к каталогу', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('home-hero-catalog-button')).toHaveText('Перейти в каталог')
    await expect.soft(page.getByTestId('home-hero-catalog-button')).toContainText('каталог')
});

test('Проверка ссылки в логотипе (Хедер)', async ({page}) => {
    await page.goto('catalog')
    await expect.soft(page.getByTestId('header-logo')).toHaveAttribute('href', '/')
});

test('Проверка ссылки в логотипе (Хедер) переход по ссылке', async ({page}) => {
    await page.goto('catalog')
    await page.getByTestId('header-logo').click()   // переход на главную
    await expect.soft(page).toHaveTitle('Главная')  // проверка title
    await expect.soft(page).toHaveURL(baseURL)      // проверка урла
});

test('Проверка перехода в каталог по кнопке Конфеты', async ({page}) => {
    await page.goto('')
    await page.getByTestId('home-category-candy').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')
    await expect.soft(page).toHaveURL(`${baseURL}catalog?category=candy`)
    // костыль await page.waitForTimeout(1000)
    await page.waitForSelector('[data-testid^="catalog-product-category-prod-"]')
    // проверка всех элементов на соответствие категории Конфеты
    const categoryItems = page.locator('[data-testid^="catalog-product-category-prod-"]')
    const count = await categoryItems.count()
    for (let i = 0; i < count; i++) {
        const categoryText = await categoryItems.nth(i).textContent()
        expect.soft(categoryText).toBe('Конфеты')
    }
});

test('Проверка закрытия плаки кук', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeVisible()
    await page.getByTestId('cookie-accept-button').click()
    await expect.soft(page.getByTestId('cookie-consent-banner')).toBeHidden()
});