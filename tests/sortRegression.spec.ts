import {test, expect} from '@playwright/test';

test('Проверка сортировки по убыванию, все страницы', async ({ page, request }) => {
    await page.goto('catalog');
    await page.getByTestId('catalog-sort-select').click();
    await page.getByTestId('catalog-sort-option-desc').click();

    let lastPrice = 5000
    let currentPage = 1
    let hasNextPage = true

    const priceLocator = page.locator('[data-testid^="catalog-product-price-prod-"]')
    await page.waitForSelector('[data-testid^="catalog-product-price-prod-"]')

    while(hasNextPage) {
        const priceElement = await priceLocator.all()
        const prices: number[] = []

        for (const element of priceElement) {
            const price = Number((await element.textContent())?.replace(/[^0-9]/g, ''))
            prices.push(price)
        }

        console.log(`${lastPrice}>${prices[0]}`)
        expect.soft(lastPrice).toBeGreaterThanOrEqual(prices[0])
        for (let i = 0; i<prices.length-1; i++) {
            console.log(`${prices[i]}<${prices[i+1]}`)
            expect.soft(prices[i]).toBeGreaterThanOrEqual(prices[i+1])
        }

        const isDisabled = await page.getByTestId('catalog-pagination-next').isDisabled()

        if (isDisabled) {
            hasNextPage = false
        } else {
            await page.getByTestId('catalog-pagination-next').click()
            await page.waitForSelector('[data-testid^="catalog-product-price-prod-"]')
        }
        lastPrice = prices[prices.length-1]
        currentPage++
    }
    console.log(currentPage)
});