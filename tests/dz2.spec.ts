import {test, expect} from '@playwright/test';
import pages from '../data/pages.json';

test('Проверка файла pages.json', async ({page}) => {
    await page.goto('')

    // находим все страницы на сайте
    const everyLink = page.locator('a[href]')
    const linkCount = await everyLink.count()

    const uniqueLink = new Set<string>()

    for (let i=0; i<linkCount; i++) {
        const hrefTemp = await everyLink.nth(i).getAttribute('href')
        if (hrefTemp) {     // в pages.json у главной url "", здесь "/", поэтому не совпадает
            uniqueLink.add(hrefTemp)
        }
    }

    console.log(uniqueLink)

    // записываем те, что есть в pages.json

    const pagesLink = new Set<string>()
    
    pages.forEach((testPage: {name: string, url: string}) => {
        const href = testPage.url
        pagesLink.add(href)
    })

    // проверяем соответствие pages.json найденным ссылкам

    const missedInJson = new Set<string>()

    for (const href of uniqueLink) {
        if (!pagesLink.has(href)) {
            missedInJson.add(href)
        }
    }

    console.log(missedInJson)

    await expect.soft(missedInJson).toHaveLength(0)

    // по идее тут должен быть новый тест для скринов, но я не нашёл
    // как переменную из этого теста использовать в другом

    await page.goto('')

    for (const url of missedInJson) {
        await page.goto('url')
        if (url == '/') {
            await expect.soft(page).toHaveScreenshot('скрин главной.png')
        } else {
            await expect.soft(page).toHaveScreenshot(`скрин ${url}.png`)
        }
    }
})