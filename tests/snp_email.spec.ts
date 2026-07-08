import { test, expect } from '@playwright/test';
import { fillAllFields } from '../helpers/fillAllFields';

// ФИО
test('ФИО валидное', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const fullname = 'Weeeeeee Rttttttttt Yffffffffffffff-Аа Rttппппппп Yffffffffццццfffffff'
    // 70 символов, латиница и кириллица, тире и пробелы (всё, что должно приниматься)

    await fillAllFields(page, { fullname, code })
    await page.getByTestId('feedback-submit-button').click();

    await expect(page.getByTestId('modal-message')).toBeVisible()
    await expect(page.getByTestId('modal-message')).
        toContainText('Ваша обратная связь принята. Мы свяжемся с вами в ближайшее время.')
})

test('ФИО невалидное по длине', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const fullname = 'Weeeeeee Rttttttttt Yffffffffffffff-Аа Rttпппаапппп Yffffffffццццffffff'
    // 71 символ, латиница и кириллица, тире и пробелы

    await fillAllFields(page, { fullname, code })

    await expect.soft(page.getByTestId('feedback-error-fullname')).toBeVisible()
    await expect.soft(page.getByTestId('feedback-error-fullname')).toContainText('ФИО не должно превышать 70 символов')
    await expect(page.getByTestId('modal-message')).not.toBeVisible()
})

test('ФИО невалидное (китайский)', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const fullname = '一個'
    // не латиница и не кириллица, проходить не должно

    await fillAllFields(page, { fullname, code })

    await expect.soft(page.getByTestId('feedback-error-fullname')).toBeVisible()
    await expect.soft(page.getByTestId('feedback-error-fullname')).toContainText('ФИО может содержать только буквы, пробелы и дефисы')
    await expect(page.getByTestId('modal-message')).not.toBeVisible()
})

test('ФИО невалидное (отсутствует)', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const fullname = 'Weeeeeee Rttttttttt Yffffffffffffff-Аа Rttппппппп Yffffffffццццfffffff'

    await fillAllFields(page, { fullname, code })
    await page.getByTestId('feedback-input-fullname').fill('') // стираю имя

    await expect.soft(page.getByTestId('feedback-error-fullname')).toBeVisible()
    await expect.soft(page.getByTestId('feedback-error-fullname')).toContainText('ФИО обязательно для заполнения')
    await expect(page.getByTestId('modal-message')).not.toBeVisible()
})

test('ФИО невалидное, символы', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const fullname = 'Weeeee" Rttttttttt Yffffffffffffff-А@ Rttпппаапппп Yffffffffццццffffff'
    // 70 символов, латиница и кириллица, тире и пробелы. Спец. символы не проходят

    await fillAllFields(page, { fullname, code })

    await expect.soft(page.getByTestId('feedback-error-fullname')).toBeVisible()
    await expect.soft(page.getByTestId('feedback-error-fullname')).
    toContainText('ФИО может содержать только буквы, пробелы и дефисы')
    await expect(page.getByTestId('modal-message')).not.toBeVisible()
})

// Почта
test('Почта валидная, мин длина', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const email = 'e_mail-example@mail.ru'
    // @ перед доменом, все символы, которые должны приниматься, 2 символа (ru) по минимуму

    await fillAllFields(page, { email, code })
    await page.getByTestId('feedback-submit-button').click();

    await expect(page.getByTestId('modal-message')).toBeVisible()
    await expect(page.getByTestId('modal-message')).
        toContainText('Ваша обратная связь принята. Мы свяжемся с вами в ближайшее время.')
})

test('Почта валидная, макс длина', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const email = 'e_mail-example@mail.ruuuuu'
    // @ перед доменом, все символы, которые должны приниматься, 6 символов (ruuuuu) по максимуму

    await fillAllFields(page, { email, code })
    await page.getByTestId('feedback-submit-button').click();

    await expect(page.getByTestId('modal-message')).toBeVisible()
    await expect(page.getByTestId('modal-message')).
        toContainText('Ваша обратная связь принята. Мы свяжемся с вами в ближайшее время.')
})

test('Почта невалидная, > макс длины', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const email = 'e_mail-example@mail.ruuuuuu'
    // @ перед доменом, все символы, которые должны приниматься, 7 символов (ruuuuuu) не подходят

    await fillAllFields(page, { email, code })

    await expect.soft(page.getByTestId('feedback-error-email')).toBeVisible()
    await expect.soft(page.getByTestId('feedback-error-email')).toContainText('Введите корректный email адрес')
    await expect(page.getByTestId('modal-message')).not.toBeVisible()
})

test('Почта невалидная (отсутствует)', async ({ page, request }) => {
    const captchaResponsePromise = page.waitForResponse((response) =>
        response.url().includes('/api/captcha')
    )
    await page.goto('/feedback');

    const capthaResponse = await captchaResponsePromise
    const { id } = await capthaResponse.json()
    const { code } = await ((await request.get(`/api/testing/captcha?id=${id}`)).json())

    const email = 'e_mail-example@mail.ru'

    await fillAllFields(page, { email, code })
    await page.getByTestId('feedback-input-email').fill('') // стираю почту

    await expect.soft(page.getByTestId('feedback-error-email')).toBeVisible()
    await expect.soft(page.getByTestId('feedback-error-email')).toContainText('Email обязателен для заполнения')
    await expect(page.getByTestId('modal-message')).not.toBeVisible()
})