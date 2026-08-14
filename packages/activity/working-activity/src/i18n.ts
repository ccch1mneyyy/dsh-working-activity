/**
 * Working-activity localization — the status-line copy pools and labels in
 * Chinese (`zh`, the default) and English (`en`).
 *
 * The plugin ships both languages; the active one is set once at startup
 * from `Config.lang` (`en` / `zh`) and defaults to `zh` (the original
 * hard-coded language). Non-React consumers (status.ts, index.ts) read it
 * through the module-level getter, matching how the cc-tui plugin resolves
 * its own UI language.
 */

export type Lang = 'zh' | 'en'

/** Is a string a valid shipped language code? */
export function isLang(value: unknown): value is Lang {
  return value === 'zh' || value === 'en'
}

/** The active language, module-level; defaults to `zh`. */
let activeLang: Lang = 'zh'

/** The currently active language. */
export function getLang(): Lang {
  return activeLang
}

/** Set the active language (called once at plugin startup). */
export function setLang(lang: Lang): void {
  activeLang = lang
}

/** Thinking phrases while the model works without a tool. */
export const THINKING_PHRASES_ZH: readonly string[] = [
  '嗯…让我捋捋', '盘一下盘一下', '大脑转起来了', '思考.gif', '给我一秒', '脑子在冒烟',
  '想呢想呢', '别催别催', '啾，让我想想', '让我琢磨下', '嗯…等一下哦', '正在盘逻辑',
  '小脑瓜动一下', '嗯？哦…', '让我理理', '翻翻脑子', '回想中', '等一下下', '让我嗅嗅',
  '脑内风暴中', '嗯…让我品品', '滴滴滴思考中', '稍等，在想', '盘明白了么', '挠头…',
  '让子弹飞一会', '让我脑补一下', '加载中', '你说 我在听', '噢…是这样', '让我嚼一嚼',
  '嗯…有点意思', '搓搓手想想', '等下，在想', '让我康康', '想好了告诉你', '脑子转圈圈',
  '嗯…让我反应下', '等下下嘛', '思路加载中', '琢磨中', '嗯…让我拆一下', '盘，都可以盘',
  '让我嗅探一下', '脑内跑火车', '嗯…让我缓一下', '滴滴，想呢', '思索.jpg', '嗯…有点东西',
  '让我品', '小跑一下思路', '等下，有画面了', '让我咀嚼', '嗯…发会儿呆', '思考泡泡',
  '脑电波传输中', '嗯…转转', '等下，盘好了', '让我回味', '滴滴滴', '思考的鱼',
  '嗯…让我摸一下', '脑子在煮咖啡', '等下，我打个腹稿', '嗯…重启一下', '让我挠墙',
  '嗯，来了来了', '脑子冒泡泡', '嗯…有点烫', '思考猫猫', '让我咕噜一下', '嗯…盘它',
  '等下，我闪个思路', '脑子在蹦迪', '嗯…', '让我想想', '盘一下', '啾', 'lol', 'hm', 'oh',
  'ok', 'um', 'heh', 'uh', 'nah', 'mm', 'wow', 'nice', 'rgrg', 'okk', 'hhh', 'emm', 'emmm',
  'CPU烧了', '让我打个log看看', '先跑一下试试', '定位一下', '排查一下', '看看日志',
  'loading 99%', '让我捋一下逻辑',
]

export const THINKING_PHRASES_EN: readonly string[] = [
  'hmm… let me sort this out', "let's see let's see", 'gears turning', 'thinking.gif', 'give me a sec', "brain's smoking",
  'thinking thinking', "don't rush me", 'hmm, let me think', 'let me mull it over', 'hmm… just a moment', 'working through the logic',
  'little brain working', 'hmm? oh…', 'let me sort this', 'searching my brain', 'recalling', 'one little moment', 'let me sniff around',
  'brainstorming', 'hmm… let me savor this', 'beep beep, thinking', 'hold on, thinking', 'figured it out yet', 'scratching head…',
  'let it cook', 'let me imagine', 'loading', 'you talk, I listen', 'oh… I see', 'let me chew on this',
  'hmm… interesting', 'rubbing hands, thinking', 'wait, thinking', 'let me look', "I'll tell you when I'm done thinking", 'brain going in circles',
  'hmm… let me process', 'just a little wait', 'loading train of thought', 'pondering', 'hmm… let me break this down', "everything's on the table",
  'let me probe around', 'brain on a train ride', 'hmm… let me catch my breath', 'beep, thinking', 'pondering.jpg', "hmm… something's here",
  'let me taste this', 'jogging the thoughts', 'wait, I can picture it', 'let me chew', 'hmm… spacing out', 'thought bubbles',
  'transmitting brainwaves', 'hmm… turning it over', 'wait, figured it out', 'let me savor', 'beep beep', 'thinking fish',
  'hmm… let me feel it out', 'brewing coffee in my brain', 'wait, drafting in my head', 'hmm… rebooting', 'let me claw the wall',
  'ok, coming', 'brain bubbling', 'hmm… a bit hot', 'thinking kitty', 'let me purr on it', 'hmm… tackle it',
  'wait, idea flash', 'brain at a rave', 'hmm…', 'let me think', "let's see", 'hmm', 'lol', 'hm', 'oh',
  'ok', 'um', 'heh', 'uh', 'nah', 'mm', 'wow', 'nice', 'rgrg', 'okk', 'hhh', 'emm', 'emmm',
  "CPU's melting", 'let me check the logs', "let's run it and see", 'locating', 'investigating', 'checking logs',
  'loading 99%', 'let me untangle the logic',
]

/** Tiered phrases when thinking runs long (elapsed >= threshold). */
export const THINKING_TIERS_ZH: readonly {
  readonly atMs: number
  readonly pool: readonly string[]
}[] = [
  { atMs: 30_000, pool: ['嗯，让我细想想', '30秒了，还在盘', '等下，快好了', '别急，就快出结果了', '让我再捋一捋', '嗯…思路没断', '30秒，快了', '等等，有眉目了', '有点久…', '转圈圈…', '马上马上', '快了快了', '别走，就快好了', '在盘了呢', '还在定位', '快复现了'] },
  { atMs: 60_000, pool: ['1分钟，还在想', '这题有点东西', '让我再钻研下', '嗯…问题不简单', '1分钟，别走开', '盘得有点深', '脑细胞在燃烧', '等等，快盘清了', '还在努力…', '这个有点绕…', '烧脑中…', '别走，快了', '一分钟了，再等等', '这题值得盘', '还在排查', '这个有点复杂'] },
  { atMs: 300_000, pool: ['5分钟，大工程', '这把我得认真', '确实有点绕', '等等，我在修仙', '快好了，真的', '盘了一大圈', '别慌，在收尾', '给我一首歌的时间', '还没放弃…', '这题真的硬…', '我给跪了…', '憋大招中', '5分钟了，等值了', '快了，真快了', '这个需求很简单', '能跑就别动'] },
]

export const THINKING_TIERS_EN: readonly {
  readonly atMs: number
  readonly pool: readonly string[]
}[] = [
  { atMs: 30_000, pool: ['hmm, let me think carefully', '30s in, still at it', 'hold on, almost there', 'easy, results are close', 'let me untangle again', 'hmm… still on track', '30s, almost', 'wait, making progress', 'taking a while…', 'going in circles…', 'soon soon', 'almost almost', 'stay, almost done', 'still working', 'still locating', 'nearly reproduced'] },
  { atMs: 60_000, pool: ['1 min in, still thinking', "this one's tricky", 'let me dig deeper', 'hmm… not simple', '1 min, stay close', 'going deep', 'neurons burning', 'wait, almost cracked it', 'still trying…', 'this is twisty…', 'burning brain…', 'stay, almost there', 'one minute, hold on', 'worth the effort', 'still investigating', 'a bit complex'] },
  { atMs: 300_000, pool: ['5 min, big job', 'this one needs focus', 'genuinely twisty', "wait, I'm transcending", 'almost done, really', 'went a long way around', 'relax, wrapping up', "give me one song's time", 'still at it…', "this one's really tough…", "I'm on my knees…", 'charging the big one', '5 min, worth the wait', 'almost, really', 'this requirement is simple', "if it runs, don't touch it"] },
]

/** Phrases shown while waiting for the first streamed token. */
export const WAITING_PHRASES_ZH: readonly string[] = [
  '呼叫模型…', '模型在路上了', '等它开口…', '稍等，它有点慢', '模型加载中', '嗯…等它一下',
  '它在组织语言', '等等我嘛', '模型醒了么', '等它伸懒腰', '它打了个哈欠', '模型：来了来了',
  '等它出字', '别急，在等', '它磨蹭呢', '模型说等一下', '等它滴一声', '模型在咕噜',
  '等它反应过来', '嗯…等它', '模型在喝水', '它说再等一下', '等它喘口气', '模型：快了快了',
  '别急别急', '来了来了', '等它跑完', '还在排队', '马上出结果', '等它热身', '模型在酝酿',
  '它翻了个身', '模型：马上', '等它开机', '它卡了一下', '模型在冥想', '等它眨个眼',
  '它说稍等', '模型在查资料', '等它缓一缓', '模型在数数', '等它回神', '它终于动了',
]

export const WAITING_PHRASES_EN: readonly string[] = [
  'calling the model…', "model's on its way", 'waiting for it to speak…', "hold on, it's a bit slow", 'loading model', 'hmm… give it a sec',
  "it's gathering words", 'wait for me', 'is the model awake', 'waiting for it to stretch', 'it yawned', 'model: coming',
  'waiting for output', 'easy, waiting', "it's dawdling", 'model says hold on', 'waiting for the beep', "model's purring",
  'waiting for it to respond', 'hmm… waiting', "model's hydrating", 'it says wait a bit', 'letting it breathe', 'model: almost',
  'easy easy', 'here it comes', 'waiting for it to finish', 'still in queue', 'results imminent', 'waiting for warm-up',
  "model's brewing", 'it rolled over', 'model: soon', 'waiting for boot', 'it hiccuped', "model's meditating",
  'waiting for a blink', 'it says one sec', "model's checking references", 'letting it recover', "model's counting",
  'waiting for it to snap back', 'it finally moved',
]

/** Tool-name patterns mapped to playful action verbs. */
export const ACTION_MAP_ZH: readonly {
  readonly test: RegExp
  readonly actions: readonly string[]
}[] = [
  { test: /^(read|read_file|cat)$/i, actions: ['翻翻文档', '让我康康', '读一下', '看一眼', '翻阅中', '读读看', '翻翻', '看看', '瞄一眼', '康康', '翻一页'] },
  { test: /^(write|write_file|create_file)$/i, actions: ['写写写', '下笔中', '码字呢', '写一段', '记录一下', '写一下', '记下来', '落笔', '开写', '存个文件'] },
  { test: /^(edit|edit_file|str_replace|apply_patch|search_replace)$/i, actions: ['改改', '修修补补', '润色一下', '编辑中', '调整调整', '改一改', '修一下', '改两行', '调一下', '补一刀'] },
  { test: /^(bash|shell|run|exec|powershell|cmd)$/i, actions: ['跑个命令', 'bash一下', '敲敲指令', '命令行走起', '执行一下', '敲回车', '跑一下', '敲个命令', '跑命令', '使唤终端'] },
  { test: /^(grep|rg|search|search_in_files)$/i, actions: ['搜搜东西', 'grep 一下', '找找匹配', '关键词走你', '过滤中', '搜搜看', '搜一下', '找找', '扫一眼', '挖一挖'] },
  { test: /^(find|glob)$/i, actions: ['找找文件', '找一下', '寻宝中', '找啊找', '文件在哪', '查找中', '搜搜目录'] },
  { test: /^(ls|list_dir|list)$/i, actions: ['列个清单', '看看目录', 'ls 看一眼', '瞄一下文件', '目录走起', '列出来', '列一下', '瞟一眼', '翻翻'] },
  { test: /^(web_search|search_web|brave|tavily|exa)$/i, actions: ['网上搜搜', '搜一下', '网络冲浪', '查找资料', '上网瞄瞄', '上网搜搜', '查查', '搜一圈', '打听一下'] },
  { test: /^(web_fetch|fetch|fetch_content)$/i, actions: ['抓个页面', '拉取一下', 'fetch 中', '扒拉网页', '取点内容', '抓取资料', '扒一下', '打开看看'] },
  { test: /^(mcp)/i, actions: ['mcp 连一下', '调个服务', '接个工具', 'mcp 走你', '调接口', '连一下', '喊外援', '接一下'] },
  { test: /^(subagent|agent|task)$/i, actions: ['派个小弟', '小助手出动', '支个 agent', '让小弟跑腿', '代理干活', '子任务起飞', '分个任务', '交给小弟', '派出去'] },
  { test: /^(todo|manage_todo_list)$/i, actions: ['列个待办', '写个清单', 'todo 安排', '记一下', '待办走起', '清单一下', '记个待办', '打个勾'] },
  { test: /^(browser|chrome|playwright)/i, actions: ['开个浏览器', '浏览器跑腿', '网页操作', '浏览器干活', '开网页', '点点页面'] },
  { test: /^(git|gh|github)/i, actions: ['git 操作', '提交一下', '版本控制', 'git 走你', '提交代码', '管个仓库', 'git 一下'] },
  { test: /^(ask_user_question|ask)$/i, actions: ['提问中', '问一个问题', 'ask 一下', '请教一下', '问问看', '问你个事', '确认一下'] },
  { test: /^(goal_complete|goal_blocked)$/i, actions: ['定个目标', '设定目标', 'goal 设置', '目标走起', '规划一下', '更新进度'] },
  { test: /^(todo_write)$/i, actions: ['记个待办', '划个清单', '打个勾'] },
]

export const ACTION_MAP_EN: readonly {
  readonly test: RegExp
  readonly actions: readonly string[]
}[] = [
  { test: /^(read|read_file|cat)$/i, actions: ['reading docs', 'peeking', 'reading', 'taking a look', 'paging through', 'reading', 'browsing', 'looking', 'glancing', 'peek', 'turning a page'] },
  { test: /^(write|write_file|create_file)$/i, actions: ['writing', 'putting pen down', 'typing away', 'writing a section', 'jotting down', 'writing', 'noting', 'first stroke', 'starting to write', 'saving a file'] },
  { test: /^(edit|edit_file|str_replace|apply_patch|search_replace)$/i, actions: ['editing', 'patching', 'polishing', 'editing', 'adjusting', 'tweaking', 'fixing', 'changing two lines', 'tuning', 'adding a touch'] },
  { test: /^(bash|shell|run|exec|powershell|cmd)$/i, actions: ['running a command', 'bashing', 'typing commands', 'command line time', 'executing', 'hitting enter', 'running', 'typing a command', 'running command', 'bossing the terminal'] },
  { test: /^(grep|rg|search|search_in_files)$/i, actions: ['searching', 'grepping', 'finding matches', 'keywords go', 'filtering', 'searching', 'searching', 'finding', 'scanning', 'digging'] },
  { test: /^(find|glob)$/i, actions: ['finding files', 'looking', 'treasure hunting', 'searching', "where's the file", 'locating', 'scanning dirs'] },
  { test: /^(ls|list_dir|list)$/i, actions: ['listing', 'checking dir', 'ls quickly', 'glancing at files', 'dir time', 'listing out', 'listing', 'peeking', 'browsing'] },
  { test: /^(web_search|search_web|brave|tavily|exa)$/i, actions: ['searching the web', 'searching', 'surfing', 'finding sources', 'browsing around', 'web searching', 'checking', 'searching around', 'asking around'] },
  { test: /^(web_fetch|fetch|fetch_content)$/i, actions: ['fetching a page', 'pulling', 'fetching', 'scraping pages', 'grabbing content', 'fetching data', 'scraping', 'opening to see'] },
  { test: /^(mcp)/i, actions: ['connecting mcp', 'calling a service', 'wiring a tool', 'mcp go', 'calling API', 'connecting', 'calling backup', 'hooking up'] },
  { test: /^(subagent|agent|task)$/i, actions: ['sending a helper', 'helper deployed', 'spinning an agent', 'helper on errand', 'agent working', 'subtask launching', 'assigning a task', 'delegating', 'dispatching'] },
  { test: /^(todo|manage_todo_list)$/i, actions: ['listing todos', 'writing a checklist', 'todo time', 'noting', 'todos go', 'checklist', 'adding a todo', 'checking off'] },
  { test: /^(browser|chrome|playwright)/i, actions: ['opening browser', 'browser on errand', 'page ops', 'browser working', 'opening page', 'clicking around'] },
  { test: /^(git|gh|github)/i, actions: ['git ops', 'committing', 'version control', 'git go', 'committing code', 'managing repo', 'gitting'] },
  { test: /^(ask_user_question|ask)$/i, actions: ['asking', 'asking a question', 'asking', 'consulting', 'asking around', 'got a question', 'confirming'] },
  { test: /^(goal_complete|goal_blocked)$/i, actions: ['setting a goal', 'goal set', 'goal setup', 'goal time', 'planning', 'updating progress'] },
  { test: /^(todo_write)$/i, actions: ['adding a todo', 'checklist time', 'checking off'] },
]

/** Fallback verbs for unknown tools. */
export const FALLBACK_ACTIONS_ZH: readonly string[] = ['干活', '调用', '整一下', '搞一下', '动动手', '备选方案', '换条路']
export const FALLBACK_ACTIONS_EN: readonly string[] = ['working', 'calling', 'doing it', 'getting it done', 'hands on', 'plan B', 'taking another path']

/** Tool failure phrases, replacing a bare ✗. */
export const FAIL_PHRASES_ZH: readonly string[] = [
  '翻车了', '哎呀', '掉了', '没跑通', '摔了一跤', '再来一次', '这不对', '出岔子了', '不灵了',
  '坏消息', '权限不对？', '连不上？', '404了', '不太对', '有点问题', '再看看', '没接住', '漏了',
  '我本地能跑啊', '昨天还能跑', '重启试试', '清一下缓存', '删了重装', '你刷新一下', '环境问题',
  '少了个分号', '拼错了', '没保存', '又不是不能用', '绷不住了', '难绷', '卒', '裂开',
  '血压上来了', '缓存害我', '再给我一次机会', '这波大意了', '手滑', '回滚重来', '换个姿势',
]

export const FAIL_PHRASES_EN: readonly string[] = [
  'that crashed', 'oops', 'it fell', "didn't work", 'stumbled', "let's retry", "that's wrong", 'something broke', 'not working',
  'bad news', 'permissions?', "can't connect?", "404'd", 'not quite right', 'slight issue', 'checking again', "didn't catch it", 'missed it',
  'works on my machine', 'worked yesterday', 'try restarting', 'clearing cache', 'reinstall it', 'try refreshing', 'environment issue',
  'missing semicolon', 'typo', "didn't save", 'it still works', "can't hold it", 'unbearable', 'dead', 'shattered',
  'blood pressure rising', 'cache got me', 'one more chance', 'got careless', 'slipped', 'rollback and retry', 'different angle',
]

/** Turn-completion phrases. */
export const DONE_PHRASES_ZH: readonly string[] = [
  '交差！', '搞定，下一个', '好了，收工', '完成啦', '交作业', '结束，完美', '完工咯', '搞定啦',
  '任务完成', '好了，歇会儿', '搞定', '收工', '妥了', '完事', '交差', '齐活', '拿下', '收工！',
  '搞定收工', '收！', '完事！', '下一题', '能跑！', '没报错', '过了', '上线！', '稳了', '6',
  '完工！', '完美收场', '这波不亏', '一次过', '收工摸鱼', '漂亮', '全绿', '干净利落',
  '手到擒来', '水到渠成', '下班！', '歇口气', '交接完成', '工单关闭', '收尾完毕',
]

export const DONE_PHRASES_EN: readonly string[] = [
  'delivered!', 'done, next', 'alright, wrapping', 'finished', 'homework done', 'done, perfect', 'complete', 'all done',
  'task complete', 'done, taking a break', 'done', 'wrapping up', 'settled', 'done deal', 'delivered', 'all set', 'nailed it', 'done!',
  'done and dusted', 'close!', 'finished!', 'next', 'it runs!', 'no errors', 'passed', 'shipped!', 'solid', '6',
  'complete!', 'perfect finish', 'worth it', 'first try', 'done, slacking', 'beautiful', 'all green', 'clean and crisp',
  'easy catch', 'naturally done', 'clocking out!', 'taking a breath', 'handover done', 'ticket closed', 'wrapped up',
]

/** Night-owl phrases mixed in between 00:00 and 06:00 local time. */
export const NIGHT_PHRASES_ZH: readonly string[] = [
  '修仙中…', '深夜冒泡', '你也是夜猫子呀', '月亮不睡我不睡', '夜里脑子慢，谅解', '晚安？还早呢',
  '深夜盘东西', '熬夜冠军上线', '困了，但能行', '过了零点照样肝', '夜猫子出没', '深夜档营业',
  '星星都睡了', '凌晨还在盘', '深夜上线', '凌晨部署', '通宵了',
]

export const NIGHT_PHRASES_EN: readonly string[] = [
  'transcending…', 'late-night surfacing', "you're a night owl too", "moon's up, so am I", 'slower brain at night, bear with me', 'good night? too early',
  'late-night grinding', 'all-nighter champion online', 'sleepy but capable', 'past midnight, still going', 'night owl spotted', 'late shift open',
  'stars are asleep', 'still at it at dawn', 'late-night online', 'dawn deploy', 'all-nighter',
]

/**
 * Resolve the phrase pools for the active language. `zh` and `en` have
 * identical shapes so consumers can pick either side uniformly.
 */
export function phrasesFor(lang: Lang): {
  readonly THINKING_PHRASES: readonly string[]
  readonly THINKING_TIERS: readonly { atMs: number; pool: readonly string[] }[]
  readonly WAITING_PHRASES: readonly string[]
  readonly ACTION_MAP: readonly { test: RegExp; actions: readonly string[] }[]
  readonly FALLBACK_ACTIONS: readonly string[]
  readonly FAIL_PHRASES: readonly string[]
  readonly DONE_PHRASES: readonly string[]
  readonly NIGHT_PHRASES: readonly string[]
} {
  const en = lang === 'en'
  return {
    THINKING_PHRASES: en ? THINKING_PHRASES_EN : THINKING_PHRASES_ZH,
    THINKING_TIERS: en ? THINKING_TIERS_EN : THINKING_TIERS_ZH,
    WAITING_PHRASES: en ? WAITING_PHRASES_EN : WAITING_PHRASES_ZH,
    ACTION_MAP: en ? ACTION_MAP_EN : ACTION_MAP_ZH,
    FALLBACK_ACTIONS: en ? FALLBACK_ACTIONS_EN : FALLBACK_ACTIONS_ZH,
    FAIL_PHRASES: en ? FAIL_PHRASES_EN : FAIL_PHRASES_ZH,
    DONE_PHRASES: en ? DONE_PHRASES_EN : DONE_PHRASES_ZH,
    NIGHT_PHRASES: en ? NIGHT_PHRASES_EN : NIGHT_PHRASES_ZH,
  }
}
