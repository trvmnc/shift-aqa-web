import {test, expect} from '@playwright/test'
import config from '../playwright.config'
import { title } from 'node:process';

const baseURL = config.use?.baseURL
if (!baseURL) {
    throw new Error('baseURL не задан в config')
}

// главная
test('Главная, Header', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-home')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-home')).toHaveAttribute('href', '/')
    await expect.soft(page.getByTestId('header-nav-link-home')).toHaveText('Главная')

    // нажатие на каталог и обратно
    await page.getByTestId('header-nav-link-catalog').click()
    await page.getByTestId('header-nav-link-home').click()
    await expect.soft(page).toHaveTitle('Главная')
    await expect.soft(page).toHaveURL(`${baseURL}`)
});

// каталог
test('Каталог, Header', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toHaveAttribute('href', '/catalog')
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toHaveText('Каталог')
    await page.getByTestId('header-nav-link-catalog').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')
    await expect.soft(page).toHaveURL(`${baseURL}catalog`)
});

// акции
test('Акции, Header', async ({page}) => {
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toHaveAttribute('href', '/promotions')
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toHaveText('Акции')
    await page.getByTestId('header-nav-link-promotions').click()
    await expect.soft(page).toHaveTitle('Акции | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}promotions`)
});

// доставка
test('Доставка, Header', async ({page}) => {
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toHaveAttribute('href', '/delivery')
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toHaveText('Доставка')
    await page.getByTestId('header-nav-link-delivery').click()
    await expect.soft(page).toHaveTitle('Доставка и оплата | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}delivery`)
});

// о нас
test('О компании, Header', async ({page}) => {
    await expect.soft(page.getByTestId('header-nav-link-about')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-about')).toHaveAttribute('href', '/about')
    await expect.soft(page.getByTestId('header-nav-link-about')).toHaveText('О нас')
    await page.getByTestId('header-nav-link-about').click()
    await expect.soft(page).toHaveTitle('О компании | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}about`)
});

// контакты
test('Контакты, Header', async ({page}) => {
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toHaveAttribute('href', '/contacts')
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toHaveText('Контакты')
    await page.getByTestId('header-nav-link-contacts').click()
    await expect.soft(page).toHaveTitle('Контакты | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}contacts`)
});
    
// обратная связь
test('Обратная связь, Header', async ({page}) => {
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toHaveAttribute('href', '/feedback')
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toHaveText('Обратная связь')
    await page.getByTestId('header-nav-link-feedback').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')
    await expect.soft(page).toHaveURL(`${baseURL}feedback`)
});

// faq
test('FAQ, Header', async ({page}) => {
    await expect.soft(page.getByTestId('header-nav-link-faq')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-faq')).toHaveAttribute('href', '/faq')
    await expect.soft(page.getByTestId('header-nav-link-faq')).toHaveText('FAQ')
    await page.getByTestId('header-nav-link-faq').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')
    await expect.soft(page).toHaveURL(`${baseURL}faq`)
});

test('Cookie, Принять', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-accept-button')).toBeVisible()
    await expect.soft(page.getByTestId('cookie-accept-button')).toHaveText('Принять')

    // нажатие
    await page.getByTestId('cookie-accept-button').click()
    await expect.soft(page.getByTestId('cookie-accept-button')).toBeHidden()
});

test('Cookie, Отклонить', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-decline-button')).toBeVisible()
    await expect.soft(page.getByTestId('cookie-decline-button')).toHaveText('Отклонить')

    // нажатие
    await page.getByTestId('cookie-decline-button').click()
    await expect.soft(page.getByTestId('cookie-accept-button')).toBeHidden()
});

test('Cookie, Политика конфиденциальности', async ({page}) => {
    await page.goto('')
    await expect.soft(page.getByTestId('cookie-consent-privacy-link')).toBeVisible()
    await expect.soft(page.getByTestId('cookie-consent-privacy-link')).toHaveAttribute('href', '/privacy')
    await expect.soft(page.getByTestId('cookie-consent-privacy-link')).toHaveText('политикой конфиденциальности')

    // нажатие
    await page.getByTestId('cookie-consent-privacy-link').click()
    await expect.soft(page).toHaveURL(`${baseURL}privacy`)        // соответствие урла
});



// test('Попытка проверки циклом', async ({page}) => {
//     const elements = [
//         {
//             datatestid: 'header-nav-link-home',
//             text: 'Главная',
//             href: '/',
//             pagetitle: 'Главная',
//             pageurl: `${baseURL}`
//         },                                         // Главная
//         {
//             datatestid: 'header-nav-link-catalog',
//             text: 'Каталог',
//             href: 'catalog',
//             pagetitle: 'СладкийДом - Интернет-магазин сладостей',
//             pageurl: `${baseURL}catalog`
//         },                                         // Каталог
//         {
//             datatestid: 'header-nav-link-promotions',
//             text: 'Акции',
//             href: 'promotions',
//             pagetitle: 'Акции | СладкийДом',
//             pageurl: `${baseURL}promotions`
//         },                                         // Акции
//         {
//             datatestid: 'header-nav-link-delivery',
//             text: 'Доставка',
//             href: 'delivery',
//             pagetitle: 'Доставка и оплата | СладкийДом',
//             pageurl: `${baseURL}delivery`
//         },                                         // Доставка
//         {
//             datatestid: 'header-nav-link-about',
//             text: 'О нас',
//             href: 'about',
//             pagetitle: 'О компании | СладкийДом',
//             pageurl: `${baseURL}about`
//         },                                         // О нас
//         {
//             datatestid: 'header-nav-link-contacts',
//             text: 'Контакты',
//             href: 'contacts',
//             pagetitle: 'Контакты | СладкийДом',
//             pageurl: `${baseURL}contacts`
//         },                                         // Контакты
//         {
//             datatestid: 'header-nav-link-feedback',
//             text: 'Обратная связь',
//             href: 'feedback',
//             pagetitle: 'СладкийДом - Интернет-магазин сладостей',
//             pageurl: `${baseURL}feedback`
//         },                                         // Обратная связь
//         {
//             datatestid: 'header-nav-link-faq',
//             text: 'FAQ',
//             href: 'faq',
//             pagetitle: 'СладкийДом - Интернет-магазин сладостей',
//             pageurl: `${baseURL}faq`
//         },                                         // FAQ
//     ]                                               

//     for (const element in elements) {
//         await page.goto('')
//         const testidtemp = page.getByTestId(element.datatestid)
//         await expect.soft(testidtemp).toBeVisible()
//         await expect.soft(testidtemp).toHaveAttribute('href', element.href)
//         await expect.soft(testidtemp).toHaveText(element.text)
//         await page.getByTestId(testidtemp).click()
//         await expect.soft(page).toHaveTitle(element.pagetitle)
//         await expect.soft(page).toHaveURL(element.pageurl)
//     }
// })                                                 // как без явного указания массивом не придумал
                                                   // ну и как ссылку правильно сделать не знаю, так тоже не видит

// особенность не нашёл (ну кроме того, что открывается общий каталог при нажатии на конфеты (на практике уже обсуждали), хотя параметр указан)