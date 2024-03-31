/* eslint-env detox/detox */

import {beforeAll, describe, it} from '@jest/globals'
import {expect} from 'detox'

import {createServer, openApp} from '../util'

describe('Create account', () => {
  let service: string
  beforeAll(async () => {
    service = await createServer('')
    await openApp({permissions: {notifications: 'YES'}})
  })

  it('I can create a new account', async () => {
    await element(by.id('e2eOpenLoggedOutView')).tap()

    await element(by.id('createAccountButton')).tap()
    await device.takeScreenshot('1- opened create account screen')
    await element(by.id('selectServiceButton')).tap()
    await device.takeScreenshot('2- selected other server')
    await element(by.id('customSelectBtn')).tap()
    await element(by.id('customServerTextInput')).typeText(service)
    await element(by.id('customServerTextInput')).tapReturnKey()
    await element(by.id('doneBtn')).tap()
    await device.takeScreenshot('3- input test server URL')
    await element(by.id('emailInput')).typeText('example@test.com')
    await element(by.id('passwordInput')).typeText('hunter2')
    await device.takeScreenshot('4- entered account details')

    await element(by.id('nextBtn')).tap()

    await element(by.id('handleInput')).typeText('e2e-test')
    await device.takeScreenshot('5- entered handle')

    await element(by.id('nextBtn')).tap()

    await expect(element(by.id('onboardingInterests'))).toBeVisible()
  })
})
