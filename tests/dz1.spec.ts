import {test, expect} from '@playwright/test'
import config from '../playwright.config'

const baseURL = config.use?.baseURL
if (!baseURL) {
    throw new Error('baseURL не задан в config')
}

test('Названия и href элементов Header', async ({page}) => {
    await page.goto('')
    // главная
    await expect.soft(page.getByTestId('header-nav-link-home')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-home')).toHaveAttribute('href', '/')
    await expect.soft(page.getByTestId('header-nav-link-home')).toHaveText('Главная')
    await page.getByTestId('header-nav-link-home').click()
    await expect.soft(page).toHaveTitle('Главная')
    await expect.soft(page).toHaveURL(`${baseURL}`)

    // каталог
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toHaveAttribute('href', '/catalog')
    await expect.soft(page.getByTestId('header-nav-link-catalog')).toHaveText('Каталог')
    await page.getByTestId('header-nav-link-catalog').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')
    await expect.soft(page).toHaveURL(`${baseURL}catalog`)

    // акции
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toHaveAttribute('href', '/promotions')
    await expect.soft(page.getByTestId('header-nav-link-promotions')).toHaveText('Акции')
    await page.getByTestId('header-nav-link-promotions').click()
    await expect.soft(page).toHaveTitle('Акции | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}promotions`)

    // доставка
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toHaveAttribute('href', '/delivery')
    await expect.soft(page.getByTestId('header-nav-link-delivery')).toHaveText('Доставка')
    await page.getByTestId('header-nav-link-delivery').click()
    await expect.soft(page).toHaveTitle('Доставка и оплата | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}delivery`)

    // о нас
    await expect.soft(page.getByTestId('header-nav-link-about')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-about')).toHaveAttribute('href', '/about')
    await expect.soft(page.getByTestId('header-nav-link-about')).toHaveText('О нас')
    await page.getByTestId('header-nav-link-about').click()
    await expect.soft(page).toHaveTitle('О компании | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}about`)

    // контакты
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toHaveAttribute('href', '/contacts')
    await expect.soft(page.getByTestId('header-nav-link-contacts')).toHaveText('Контакты')
    await page.getByTestId('header-nav-link-contacts').click()
    await expect.soft(page).toHaveTitle('Контакты | СладкийДом')
    await expect.soft(page).toHaveURL(`${baseURL}contacts`)

    // обратная связь
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toBeVisible()
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toHaveAttribute('href', '/feedback')
    await expect.soft(page.getByTestId('header-nav-link-feedback')).toHaveText('Обратная связь')
    await page.getByTestId('header-nav-link-feedback').click()
    await expect.soft(page).toHaveTitle('СладкийДом - Интернет-магазин сладостей')
    await expect.soft(page).toHaveURL(`${baseURL}feedback`)

    // faq
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
});