/**
 * Copy pools for the working-activity status line: short, colloquial, playful
 * Chinese fragments with deadpan English one-liners mixed in, matching the
 * pi-working-activity tone. Everything here is pure data + pure pickers.
 *
 * Bilingual: the pools resolve against the active language (see i18n.ts,
 * `setLang()`), defaulting to `zh` — the original hard-coded language.
 * @module @deepseek-ai/dsh-working-activity/phrases
 */

import {
  getLang,
  phrasesFor,
} from './i18n.js'

/** A pool of copy fragments. */
export type PhrasePool = readonly string[]

/** Pick one random entry; repeated draws avoid the previous entry when possible. */
export function pickPhrase(entries: PhrasePool, previous?: string): string {
  if (entries.length === 0) throw new Error('pickPhrase() requires a non-empty pool')
  if (entries.length === 1) return entries[0] as string
  let next = entries[Math.floor(Math.random() * entries.length)] as string
  let guard = 0
  while (next === previous && guard++ < 8) {
    next = entries[Math.floor(Math.random() * entries.length)] as string
  }
  return next
}

/** Thinking phrases while the model works without a tool (active language). */
export const THINKING_PHRASES: readonly string[] = phrasesFor(getLang()).THINKING_PHRASES

/** Tiered phrases when thinking runs long (elapsed >= threshold). */
export const THINKING_TIERS: readonly {
  /** Minimum thinking ms for this tier. */
  readonly atMs: number
  readonly pool: readonly string[]
}[] = phrasesFor(getLang()).THINKING_TIERS

/** Phrases shown while waiting for the first streamed token. */
export const WAITING_PHRASES: readonly string[] = phrasesFor(getLang()).WAITING_PHRASES

/** Tool-name patterns mapped to playful action verbs. */
export const ACTION_MAP: readonly {
  readonly test: RegExp
  readonly actions: readonly string[]
}[] = phrasesFor(getLang()).ACTION_MAP

/** Fallback verbs for unknown tools. */
export const FALLBACK_ACTIONS: readonly string[] = phrasesFor(getLang()).FALLBACK_ACTIONS

/** Tool failure phrases, replacing a bare ✗. */
export const FAIL_PHRASES: readonly string[] = phrasesFor(getLang()).FAIL_PHRASES

/** Turn-completion phrases. */
export const DONE_PHRASES: readonly string[] = phrasesFor(getLang()).DONE_PHRASES

/** Night-owl phrases mixed in between 00:00 and 06:00 local time. */
export const NIGHT_PHRASES: readonly string[] = phrasesFor(getLang()).NIGHT_PHRASES

/** Common git tool names / bash commands containing `git `. */
export const GIT_TOOL_RE = /^(?:git|git_diff|git_commit|git_push|git_pull|git_checkout|git_branch|git_merge|git_rebase|github|gh)$/i

/** Detect the 00:00–06:00 night window (local time). */
export function isNight(hour: number): boolean {
  return hour >= 0 && hour < 6
}

/**
 * Pick a thinking phrase appropriate for the elapsed thinking time.
 * @param elapsedMs - Milliseconds spent thinking in the current phase.
 * @param previous - Previously shown phrase, to avoid repeats.
 * @param night - Mix night-owl copy into the pool.
 */
export function thinkingPhrase(elapsedMs: number, previous?: string, night = false): string {
  const { THINKING_PHRASES, THINKING_TIERS, NIGHT_PHRASES } = phrasesFor(getLang())
  let pool: readonly string[] = THINKING_PHRASES
  for (const tier of THINKING_TIERS) {
    if (elapsedMs >= tier.atMs) {
      pool = tier.pool
      break
    }
  }
  if (night && pool === THINKING_PHRASES) {
    return pickPhrase([...pool, ...NIGHT_PHRASES], previous)
  }
  return pickPhrase(pool, previous)
}

/**
 * Map a tool name to a playful action verb.
 * @param toolName - Registry tool name (unqualified).
 * @param custom - Exact-name custom action pools, matched case-insensitively.
 */
export function actionFor(toolName: string, custom?: Readonly<Record<string, readonly string[]>>): string {
  const { ACTION_MAP, FALLBACK_ACTIONS } = phrasesFor(getLang())
  const normalized = toolName.trim().toLowerCase()
  const customPool = custom?.[normalized]
  if (customPool !== undefined && customPool.length > 0) return pickPhrase(customPool)
  for (const { test, actions } of ACTION_MAP) {
    if (test.test(normalized)) return pickPhrase(actions)
  }
  return pickPhrase(FALLBACK_ACTIONS)
}

/** Whether a tool is a git operation (name match, or a shell command containing `git `). */
export function isGitTool(toolName: string, args?: Readonly<Record<string, unknown>>): boolean {
  if (GIT_TOOL_RE.test(toolName.trim())) return true
  if (/^(?:bash|shell|cmd|powershell|pwsh)$/i.test(toolName.trim())) {
    const command = args?.command ?? args?.cmdline
    return typeof command === 'string' && /\bgit\s+/.test(command)
  }
  return false
}

/** Format milliseconds as a compact human duration (`1m23s`). */
export function fmtDuration(ms: number): string {
  if (ms < 1000) return '0s'
  const total = Math.floor(ms / 1000)
  if (total < 60) return `${total}s`
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  if (minutes < 60) return `${minutes}m${seconds}s`
  const hours = Math.floor(minutes / 60)
  return `${hours}h${minutes % 60}m`
}
