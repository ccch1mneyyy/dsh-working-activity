/**
 * English-mode smoke: `setLang('en')` must switch the pools the public
 * functions resolve (thinkingPhrase / actionFor). The const pool exports
 * (THINKING_PHRASES etc.) are snapshot at import time — they keep their
 * documented zh default; runtime language switching goes through the
 * functions. Default stays `zh`.
 * @module @deepseek-ai/dsh-working-activity/tests/i18n-en
 */

import { describe, expect, it } from 'vitest'
import { setLang, getLang } from '../src/i18n.ts'
import {
  THINKING_PHRASES, DONE_PHRASES,
  actionFor, thinkingPhrase,
} from '../src/phrases.ts'

describe('i18n language switch', () => {
  it('defaults to zh', () => {
    expect(getLang()).toBe('zh')
    expect(THINKING_PHRASES[0]).toMatch(/[\u4e00-\u9fff]/)
    expect(DONE_PHRASES[0]).toMatch(/[\u4e00-\u9fff]/)
  })

  it('switches function-resolved pools to English', () => {
    setLang('en')
    expect(getLang()).toBe('en')
    const think = thinkingPhrase(0)
    expect(think).not.toMatch(/[\u4e00-\u9fff]/)
    const verb = actionFor('bash')
    expect(verb).not.toMatch(/[\u4e00-\u9fff]/)
  })

  it('switches back to zh', () => {
    setLang('zh')
    expect(getLang()).toBe('zh')
    const think = thinkingPhrase(0)
    expect(think).toMatch(/[\u4e00-\u9fff]/)
  })
})
