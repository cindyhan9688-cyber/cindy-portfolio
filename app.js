/* ============================================================
   Cindy奕飒 · Growing with AI — app.js
   数据来源：本机 AI 会话记录自动统计（见 stats.js 快照），无编造。
   ============================================================ */

const STATS = window.CINDY_STATS;
const TOTAL_HOURS = STATS.baseHours + STATS.liveHours;

/* ---------- i18n ---------- */
const I18N = {
  zh: {
    "nav.time":"时间","nav.heatmap":"和AI成长热力图","nav.finance":"金融技能","nav.projects":"作品","nav.contact":"联系",
    "hero.hello":"你好~ 我是Cindy奕飒，很高兴认识你",
    "hero.slogan":"和 AI 一起成长",
    "hero.sub":"这里的每一件作品，都是我和 AI 结对完成的。",
    "hours.label":"与 AI 共同度过","hours.asof":"数据截至",
    "hours.base":"初始积累","hours.live":"实时统计",
    "cta.works":"查看作品 →","cta.contact":"联系我",
    "chip.together":"同行","chip.talks":"次对话","chip.growing":"成长中",
    "time.title":"时间在流动","time.sub":"每一秒都像流沙——抓不住，但可以用来成长。",
    "time.sand":"今日沙漏 · 上仓=今天剩余 · 下仓=已流逝","time.now":"此刻","time.today":"今天已流逝","time.since":"距离我们第一次对话",
    "hm.title":"每日训练AI成长热力图","hm.sub":"颜色越深 = 那天我和 AI 聊得越多。数据来自真实会话记录，一格都没编。",
    "hm.less":"少","hm.more":"多",
    "st.events":"消息事件","st.sessions":"会话","st.days":"活跃天数","st.peak":"单日峰值",
    "fin.title":"金融技能 · Finance Arsenal","fin.sub":"重点板块。多条金融分析线 + 数据工具，每条都是一个可复用的分析引擎。",
    "fin.note":"⚠ 以上均为学习研究用途，不构成投资建议。",
    "pj.title":"全部作品","pj.sub":"按真实时间戳排列——每一张卡片，都对应一段我和 AI 的对话。",
    "pj.private":"🔒 非公开项目","pj.more":"查看详情 →",
    "ct.title":"联系我","ct.sub":"想聊 AI、金融、产品，或者只是打个招呼——都欢迎。","ct.copy":"复制邮箱","ct.copied":"已复制 ✓",
    "ct.name":"你的称呼","ct.reply":"你的邮箱或联系方式","ct.msg":"想对我说的话…","ct.send":"发送留言",
    "ct.sent":"已发送，我会尽快回复 ✓","ct.fail":"发送服务暂不可用，已为你打开邮件客户端","ct.note":"留言会直接送达我的 Gmail 收件箱。",
    "ft.built":"本站由 Cindy奕飒 × AI 结对构建","ft.data":"全部数据可回溯至本机会话记录",
    "filter.all":"全部","filter.ai":"AI 产品","filter.tool":"工程工具","filter.kb":"成长知识库","filter.life":"生活技能",
    "status.done":"● 已上线","status.wip":"◐ 进行中",
    "tip.msgs":"条交互","day.d":"天","day.h":"时","day.m":"分","day.s":"秒",
    months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    dows:["一","","三","","五","","日"],
    dateFmt: d => `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日 星期${"日一二三四五六"[d.getDay()]}`
  },
  en: {
    "nav.time":"Time","nav.heatmap":"Growth Heatmap","nav.finance":"Finance","nav.projects":"Projects","nav.contact":"Contact",
    "hero.hello":"Hi~ I'm Cindy Yisa. Nice to meet you!",
    "hero.slogan":"Growing with AI",
    "hero.sub":"Everything here was pair-built by me and AI.",
    "hours.label":"TIME SPENT WITH AI","hours.asof":"as of",
    "hours.base":"base","hours.live":"live-tracked",
    "cta.works":"View works →","cta.contact":"Contact me",
    "chip.together":"together","chip.talks":"talks","chip.growing":"growing",
    "time.title":"Time Is Flowing","time.sub":"Every second slips away like sand — you can't hold it, but you can grow with it.",
    "time.sand":"Today's hourglass · top = time left · bottom = elapsed","time.now":"NOW","time.today":"today has flowed","time.since":"since our first conversation",
    "hm.title":"Daily AI-Growth Training Heatmap","hm.sub":"Darker = more conversations with AI that day. Real session data — not a single cell is made up.",
    "hm.less":"less","hm.more":"more",
    "st.events":"message events","st.sessions":"sessions","st.days":"active days","st.peak":"daily peak",
    "fin.title":"Finance Arsenal","fin.sub":"The featured section. Multiple lines of financial analysis + data tools — each one a reusable engine.",
    "fin.note":"⚠ For study & research only. Not investment advice.",
    "pj.title":"All Works","pj.sub":"Ordered by real timestamps — every card maps to a conversation between me and AI.",
    "pj.private":"🔒 Private project","pj.more":"View details →",
    "ct.title":"Contact","ct.sub":"AI, finance, product — or just say hi. All welcome.","ct.copy":"Copy email","ct.copied":"Copied ✓",
    "ct.name":"Your name","ct.reply":"Your email or contact","ct.msg":"What would you like to say…","ct.send":"Send message",
    "ct.sent":"Sent — I'll reply soon ✓","ct.fail":"Service unavailable — opened your mail app instead","ct.note":"Messages land directly in my Gmail inbox.",
    "ft.built":"Built by Cindy Yisa × AI, as pair","ft.data":"All data traceable to local session logs",
    "filter.all":"All","filter.ai":"AI Products","filter.tool":"Tools","filter.kb":"Knowledge Bases","filter.life":"Life Skills",
    "status.done":"● shipped","status.wip":"◐ in progress",
    "tip.msgs":"interactions","day.d":"d","day.h":"h","day.m":"m","day.s":"s",
    months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    dows:["Mon","","Wed","","Fri","","Sun"],
    dateFmt: d => d.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})
  },
  ja: {
    "nav.time":"時間","nav.heatmap":"AI成長ヒートマップ","nav.finance":"金融スキル","nav.projects":"作品","nav.contact":"連絡",
    "hero.hello":"こんにちは〜 Cindy奕飒です。はじめまして！",
    "hero.slogan":"AIと一緒に成長する",
    "hero.sub":"ここにある作品はすべて、私とAIのペア作業で生まれました。",
    "hours.label":"AIと過ごした時間","hours.asof":"データ基準日",
    "hours.base":"初期積立","hours.live":"リアルタイム集計",
    "cta.works":"作品を見る →","cta.contact":"連絡する",
    "chip.together":"共に","chip.talks":"対話","chip.growing":"成長中",
    "time.title":"時は流れている","time.sub":"一秒一秒は流砂のよう——掴めないけれど、成長には使える。",
    "time.sand":"今日の砂時計 · 上=残り時間 · 下=経過時間","time.now":"いま","time.today":"今日の経過","time.since":"初めての対話から",
    "hm.title":"毎日のAI成長トレーニング・ヒートマップ","hm.sub":"色が濃い = その日AIとたくさん話した。実データのみ、捏造は一マスもなし。",
    "hm.less":"少","hm.more":"多",
    "st.events":"メッセージ数","st.sessions":"セッション","st.days":"アクティブ日数","st.peak":"1日最大",
    "fin.title":"金融スキル · Finance Arsenal","fin.sub":"注目セクション。複数の金融分析ライン + データツール。それぞれが再利用可能な分析エンジン。",
    "fin.note":"⚠ 学習・研究目的のみ。投資助言ではありません。",
    "pj.title":"すべての作品","pj.sub":"実際のタイムスタンプ順——カード一枚一枚が、私とAIの対話の記録。",
    "pj.private":"🔒 非公開プロジェクト","pj.more":"詳細を見る →",
    "ct.title":"連絡先","ct.sub":"AI、金融、プロダクト、あるいは挨拶だけでも——大歓迎。","ct.copy":"メールをコピー","ct.copied":"コピー済み ✓",
    "ct.name":"お名前","ct.reply":"メールまたは連絡先","ct.msg":"メッセージをどうぞ…","ct.send":"送信する",
    "ct.sent":"送信しました。すぐ返信します ✓","ct.fail":"送信サービス不可 — メールアプリを開きました","ct.note":"メッセージは私のGmailへ直接届きます。",
    "ft.built":"本サイトは Cindy奕飒 × AI のペアで構築","ft.data":"全データはローカルのセッション記録まで遡れます",
    "filter.all":"すべて","filter.ai":"AIプロダクト","filter.tool":"ツール","filter.kb":"ナレッジベース","filter.life":"ライフスキル",
    "status.done":"● リリース済","status.wip":"◐ 進行中",
    "tip.msgs":"件","day.d":"日","day.h":"時","day.m":"分","day.s":"秒",
    months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    dows:["月","","水","","金","","日"],
    dateFmt: d => `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日（${"日月火水木金土"[d.getDay()]}）`
  }
};

/* ---------- 金融技能（重点） ---------- */
const FINANCE = [
  { tag:"PIPELINE", ts:"2026-07-13", link:"work/skill-pipeline.html",
    zh:["金融事件分析流水线","对任何突发金融事件做 7 步预判：追钱的流向、定位周期、看玩家利益、带时间线给出剧本。"],
    en:["Financial Event Pipeline","A 7-step playbook for any breaking financial event: follow the money, locate the cycle, map player incentives, forecast with a timeline."],
    ja:["金融イベント分析パイプライン","突発的な金融イベントを7ステップで予測：資金の流れを追い、サイクルを特定し、プレイヤーの利害を読み、タイムライン付きでシナリオを出す。"] },
  { tag:"MACRO / DERIVATIVES", ts:"2026-07-13", link:"work/skill-macro.html",
    zh:["宏观金融机制拆解","用基金经理级的宏观+衍生品视角，拆解政策与资产估值的底层机制，先做风险-收益对称性体检。"],
    en:["Macro Mechanism Deconstruction","Fund-manager-grade macro & derivatives lens: deconstruct the mechanics beneath policies and valuations, starting with a risk-reward symmetry check."],
    ja:["マクロ金融メカニズム分解","ファンドマネージャー級のマクロ+デリバティブ視点で、政策と資産評価の根底メカニズムを分解。まずリスク・リワードの対称性を検査。"] },
  { tag:"MULTI-MARKET", ts:"2026-07-12", link:"work/skill-multimarket.html",
    zh:["多市场联动技术分析","加密/外汇/黄金/原油/美股/美债一屏对照，供需订单块结构 + 按波动率定仓位。"],
    en:["Multi-Market Structure Analysis","Crypto, FX, gold, oil, equities and bonds on one screen: supply-demand order blocks + volatility-based sizing."],
    ja:["マルチマーケット連動テクニカル","暗号資産/為替/金/原油/米株/米債を一画面で対照。需給オーダーブロック構造+ボラティリティ基準のサイジング。"] },
  { tag:"CRYPTO / ARBITRAGE", ts:"2026-07-11", link:"work/skill-crypto-arb.html",
    zh:["Crypto 套利认知引擎","用毒辣的套利视角审视任何币/理财机会给出盈亏比，配免 key 的资金费率/基差/持仓数据探针。"],
    en:["Crypto Arbitrage Lens","A sharp arbitrage lens that scores any coin or yield offer by risk-reward, backed by keyless probes for funding rates, basis and open interest."],
    ja:["Cryptoアービトラージ認知エンジン","鋭い裁定視点であらゆるコイン・利回り案件をリスクリワードで採点。資金調達率/ベーシス/建玉のキーレス・データプローブ付き。"] },
  { tag:"DATA", ts:"2026-07-10", link:"work/crypto-price.html",
    zh:["Crypto 价格采集器","双数据源实时查 BTC/ETH/SOL 价格，双源互验防单点错价。"],
    en:["Crypto Price Collector","Dual-source real-time BTC/ETH/SOL prices, cross-validated to kill single-source errors."],
    ja:["Crypto価格コレクター","デュアルソースでBTC/ETH/SOLをリアルタイム取得、相互検証で単一ソースの誤値を排除。"] },
  { tag:"KNOWLEDGE BASE", ts:"2026-07-10",
    zh:["美股成长知识库","从开户、跨境资金到交易心法的完整学习档案，含风险与合规红线笔记。"],
    en:["US Equity Knowledge Base","A complete learning archive from brokerage setup and cross-border funding to trading mindset, with risk & compliance red lines."],
    ja:["米国株成長ナレッジベース","口座開設、資金移動から取引の心得までの学習アーカイブ。リスクとコンプライアンスのレッドライン付き。"] }
];

/* ---------- 全部作品 ---------- */
const PROJECTS = [
  { cat:"ai", ts:"2026-07-10", wip:false,
    zh:["Bot 控制台","管理一群 bot 的本机网页控制台，蓝白 UI，加一个 bot 只需改一行配置。"],
    en:["Bot Console","A local web console managing a fleet of bots — blue-white UI, add a bot by editing one config line."],
    ja:["Botコンソール","複数ボットを管理するローカルWebコンソール。青白UI、設定1行でボット追加。"] },
  { cat:"ai", ts:"2026-07-12", wip:false, link:"work/guimi.html",
    zh:["赛博闺蜜平台协作","参与 AI 陪伴平台开发，贡献 8 个三语（中/英/日）女性需求技能：情绪、职场、理财、育儿…"],
    en:["Cyber-Bestie Platform","Contributed to an AI companion platform: 8 trilingual (zh/en/ja) skills for women's needs — emotions, career, money, parenting…"],
    ja:["サイバー親友プラットフォーム","AIコンパニオン開発に参加。感情・キャリア・お金・育児など、女性向け三言語スキルを8本提供。"] },
  { cat:"ai", ts:"2026-07-14", wip:true,
    zh:["微信客服⇄飞书中转","用户在微信聊、我在飞书处理：官方客服通道 + 多维表格建档 + AI 草稿。"],
    en:["WeChat⇄Feishu Relay","Customers chat on WeChat, I work in Feishu: official service channel + auto-archiving + AI-drafted replies."],
    ja:["WeChat⇄Feishu中継","ユーザーはWeChat、私はFeishuで対応。公式チャネル+自動記録+AI下書き。"] },
  { cat:"tool", ts:"2026-07-10", wip:false, link:"work/amap-travel.html",
    zh:["高德旅游数据采集器","一条命令查任意城市天气/美食/酒店/景点，一键导出 HTML/长图/PDF/Word/MD 五种格式。"],
    en:["Amap Travel Collector","One command pulls weather, food, hotels and sights for any city — exports to 5 formats in one click."],
    ja:["高徳旅行データコレクター","コマンド一つで任意都市の天気/グルメ/ホテル/観光地を取得、5形式へワンクリック出力。"] },
  { cat:"tool", ts:"2026-07-14", wip:false, link:"work/html2pdf.html",
    zh:["HTML→长图/PDF 工具","任何 HTML 一键导出高清长图 PNG + 单页长版 PDF，报告分享神器。"],
    en:["HTML→Image/PDF Tool","Turn any HTML into a hi-res long PNG + single-page PDF in one click — perfect for sharing reports."],
    ja:["HTML→画像/PDF変換ツール","任意のHTMLを高解像度ロング画像PNG+1ページPDFへワンクリック変換。"] },
  { cat:"tool", ts:"2026-07-10", wip:false, link:"work/api-playbook.html",
    zh:["API 接入通用流程","接入任意平台 API 的七步流水线 + 各大平台速查表 + 状态码排错手册。"],
    en:["API Integration Playbook","A 7-step pipeline for integrating any platform API, with a platform cheat sheet and error-code troubleshooting manual."],
    ja:["API接続プレイブック","任意プラットフォームAPIを繋ぐ7ステップ+主要プラットフォーム早見表+エラーコード対処マニュアル。"] },
  { cat:"ai", ts:"2026-07-14", wip:true,
    zh:["旅游一下 YesTrip","旅游小程序立项：MVP 是日本旅行必买清单，11 条产品决策已拍板。"],
    en:["YesTrip Mini-App","A travel mini-program in the making: MVP is a Japan must-buy checklist, 11 product decisions locked."],
    ja:["YesTripミニプログラム","旅行ミニアプリ企画中：MVPは日本旅行の必買リスト、11の製品決定が確定済み。"] },
  { cat:"kb", ts:"2026-07-09", wip:false,
    zh:["网工出海成长之路","网络工程师出海知识库：10 份深度笔记 + 检索网页，含 AI 网络（AIN）风口研判。"],
    en:["Network Engineer KB","A knowledge base for network engineers going global: 10 deep-dive notes + a searchable site, including the AI-networking wave."],
    ja:["ネットワークエンジニアKB","海外就職向けネットワークエンジニア知識庫：深掘りノート10本+検索サイト、AIネットワーキングの潮流分析込み。"] },
  { cat:"kb", ts:"2026-07-09", wip:false, locked:true,
    zh:["AIN 项目",""],
    en:["AIN Project",""],
    ja:["AINプロジェクト",""] },
  { cat:"life", ts:"2026-07-09", wip:false,
    zh:["简历+面试准备技能","把真实经历和工作经验，准确地传达给面试官：AI 打分、JD 关键词、STAR 故事。"],
    en:["Resume & Interview Skill","Convey your real experience and work history to interviewers, accurately: AI scoring, JD keywords, STAR stories."],
    ja:["履歴書+面接準備スキル","実際の経歴と職務経験を面接官へ正確に伝える：AI採点、JDキーワード、STARストーリー。"] },
  { cat:"life", ts:"2026-07-11", wip:false, link:"work/selfie.html",
    zh:["人像自拍全流程清单","从妆容、选光到机位姿势的 7 步拍照方案，要素库拆解自真实爆款组图。"],
    en:["Portrait Selfie Checklist","A 7-step shooting plan from makeup and light to angles and poses, distilled from real viral photo sets."],
    ja:["セルフィー全工程チェックリスト","メイク・光選び・アングル・ポーズまでの7ステップ撮影プラン。実際のバズった作例から要素を抽出。"] },
  { cat:"life", ts:"2026-07-11", wip:false,
    zh:["培训机构架构设计","三层组织架构 + 最小权限分工 + 六步搭建法：把 AI 人格架构翻译成真人机构 SOP。"],
    en:["Training Org Blueprint","Three-tier org design + least-privilege roles + a 6-step build guide: translating AI agent architecture into human org SOPs."],
    ja:["研修機関アーキテクチャ設計","三層組織+最小権限の分業+6ステップ構築法。AIエージェント構造を人間組織のSOPへ翻訳。"] },
  { cat:"life", ts:"2026-07-09", wip:true, link:"work/comic.html",
    zh:["漫画风·夏日色彩","仿治愈系漫画做「夏天的颜色」一组六张：文案 + 中英提示词 + 字体方案。"],
    en:["Summer Colors Comic Set","A six-piece healing-comic-style series on summer colors: copywriting + bilingual prompts + typography plan."],
    ja:["夏色コミックシリーズ","癒し系漫画風「夏の色」6枚組：コピー+日英プロンプト+フォント設計。"] },
];

/* ============================================================ */
let lang = localStorage.getItem("cindy-lang") || "zh";
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const T = k => I18N[lang][k] || I18N.zh[k] || k;

/* ---------- i18n apply ---------- */
function applyLang(){
  document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
  $$("[data-i18n]").forEach(el => { el.textContent = T(el.dataset.i18n); });
  $$(".lang-switch button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  startTyping();
  renderHeatmap();
  renderFinance();
  renderFilters();
  renderProjects();
  renderTicker();
  renderHoursSplit();
  renderPeakDate();
  tickClock();
  [["#cfName","ct.name"],["#cfReply","ct.reply"],["#cfMsg","ct.msg"]]
    .forEach(([sel,key]) => { const el = $(sel); if (el) el.placeholder = T(key); });
}
$$(".lang-switch button").forEach(b => b.addEventListener("click", () => {
  lang = b.dataset.lang; localStorage.setItem("cindy-lang", lang); applyLang();
}));

/* ---------- typewriter ---------- */
let typeTimer = null;
function startTyping(){
  const el = $("#typed"), text = T("hero.hello");
  clearTimeout(typeTimer); el.textContent = "";
  let i = 0;
  (function step(){
    if (i <= text.length){
      el.textContent = text.slice(0, i); i++;
      typeTimer = setTimeout(step, 65 + Math.random()*50);
    }
  })();
}

/* ---------- hours counter：30% 初始积累 + 实测时长 ---------- */
const fmtH = n => n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
function renderHoursSplit(){
  const basePct = (STATS.baseHours / STATS.goal * 100);
  const livePct = (STATS.liveHours / STATS.goal * 100);
  $("#hoursSplit").textContent =
    `= ${T("hours.base")} ${basePct.toFixed(0)}% + ${T("hours.live")} ${livePct.toFixed(2)}%`;
}
/* 单日峰值的日期必须跟着 STATS.daily 动态算，不能写死——写死的日期会在数据更新后过期 */
function renderPeakDate(){
  const el = $("#stPeakDate");
  if (!el) return;
  const entries = Object.entries(STATS.daily);
  if (!entries.length) return;
  const [peakKey] = entries.reduce((a, b) => (b[1] > a[1] ? b : a));
  const d = new Date(peakKey + "T00:00:00");
  const fmt = {
    zh: () => `${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`,
    en: () => d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    ja: () => `${d.getMonth()+1}/${d.getDate()}`
  };
  el.textContent = (fmt[lang] || fmt.zh)();
}
function animateHours(){
  const el = $("#hoursNum"), pctEl = $("#hoursPct"), fill = $("#hoursFill");
  const dur = 1900, t0 = performance.now();
  (function frame(t){
    const p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmtH(TOTAL_HOURS * e);
    if (p < 1) requestAnimationFrame(frame);
  })(t0);
  const pct = (TOTAL_HOURS / STATS.goal * 100);
  setTimeout(() => { fill.style.width = pct + "%"; }, 250);
  pctEl.textContent = pct.toFixed(2) + "%";
  $("#asofDate").textContent = STATS.asof;
  $("#chipHours").textContent = fmtH(TOTAL_HOURS); // 环绕标签：30%初始 + 实测的总时长
  $("#chipSessions").textContent = STATS.sessions;
  $("#stEvents").textContent = STATS.events.toLocaleString();
  $("#stSessions").textContent = STATS.sessions;
  $("#stDays").textContent = Object.keys(STATS.daily).length;
  $("#stPeak").textContent = Math.max(...Object.values(STATS.daily)).toLocaleString();
}

/* ---------- 3D tilt ---------- */
(function(){
  const scene = $("#tiltScene"), card = $("#tiltCard");
  const zone = document.querySelector(".hero");
  let raf = null;
  zone.addEventListener("mousemove", e => {
    const r = scene.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const dx = (e.clientX - cx) / (r.width/2), dy = (e.clientY - cy) / (r.height/2);
    const rx = Math.max(-1, Math.min(1, dy)) * -14;
    const ry = Math.max(-1, Math.min(1, dx)) * 16;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
  });
  zone.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
})();

/* ---------- ticker ---------- */
function renderTicker(){
  const names = FINANCE.concat(PROJECTS.filter(p => !p.locked)).map(p => (p[lang] || p.zh)[0]);
  const seq = names.map(n => `<span>${n}</span><i>◆</i>`).join("");
  $("#tickerTrack").innerHTML = seq + seq; // duplicated for seamless loop
}

/* ---------- clock + day flow + since ---------- */
const FIRST = new Date(STATS.firstContact);
function tickClock(){
  const n = new Date();
  const hh = String(n.getHours()).padStart(2,"0"),
        mm = String(n.getMinutes()).padStart(2,"0"),
        ss = String(n.getSeconds()).padStart(2,"0");
  $("#clockBig").innerHTML = [...`${hh}:${mm}:${ss}`]
    .map(ch => ch === ":" ? `<span class="cl">:</span>` : `<span class="dg">${ch}</span>`).join("");
  $("#clockDate").textContent = I18N[lang].dateFmt(n);
  const dayStart = new Date(n); dayStart.setHours(0,0,0,0);
  const pct = (n - dayStart) / 86400000 * 100;
  $("#dayPct").textContent = pct.toFixed(5) + "%";
  $("#dayFill").style.width = pct + "%";
  let diff = Math.max(0, n - FIRST) / 1000;
  const d = Math.floor(diff/86400); diff -= d*86400;
  const h = Math.floor(diff/3600); diff -= h*3600;
  const m = Math.floor(diff/60);  const s = Math.floor(diff - m*60);
  $("#sinceBig").textContent =
    `${d}${T("day.d")} ${String(h).padStart(2,"0")}${T("day.h")} ${String(m).padStart(2,"0")}${T("day.m")} ${String(s).padStart(2,"0")}${T("day.s")}`;
}
setInterval(tickClock, 1000);

/* ---------- 今日沙漏：立体玻璃 3D 渲染（纯白背景） ----------
   上仓=今日剩余 · 下仓=已流逝，沙面按玻璃截面积占比换算，比例=真实时间 */
(function(){
  const cv = $("#sandCanvas"), ctx = cv.getContext("2d");
  const CW = 360, CH = 460;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  cv.width = CW * dpr; cv.height = CH * dpr;
  cv.style.maxWidth = CW + "px";
  ctx.scale(dpr, dpr);

  const cx = 180;
  const T0 = 40, T1 = 214, B0 = 236, B1 = 420;
  const PI = Math.PI;

  function quad(p0, c, p1, t){
    const u = 1 - t;
    return [u*u*p0[0] + 2*u*t*c[0] + t*t*p1[0], u*u*p0[1] + 2*u*t*c[1] + t*t*p1[1]];
  }
  function buildProfile(segs, y0, y1){
    const w = new Float32Array(y1 - y0 + 1).fill(-1);
    segs.forEach(([p0, c, p1]) => {
      for (let i = 0; i <= 150; i++){
        const [x, y] = quad(p0, c, p1, i / 150);
        const yi = Math.round(y) - y0;
        if (yi >= 0 && yi < w.length) w[yi] = Math.max(w[yi], x);
      }
    });
    let last = -1;
    for (let i = 0; i < w.length; i++){
      if (w[i] >= 0){
        if (last >= 0 && i - last > 1)
          for (let j = last + 1; j < i; j++)
            w[j] = w[last] + (w[i] - w[last]) * (j - last) / (i - last);
        last = i;
      }
    }
    for (let i = 0; i < w.length; i++) if (w[i] < 0) w[i] = 0;
    return w;
  }
  // 原画比例：上球较小的水滴，下球饱满的洋葱
  const wTop = buildProfile([
    [[10, T0], [92, 50], [94, 108]],
    [[94, 108], [80, 176], [6, T1]]
  ], T0, T1);
  const wBot = buildProfile([
    [[6, B0], [106, 262], [124, 328]],
    [[124, 328], [124, 408], [52, B1]]
  ], B0, B1);

  function prefix(w){
    const p = new Float32Array(w.length); let acc = 0;
    for (let i = w.length - 1; i >= 0; i--){ acc += 2 * w[i]; p[w.length - 1 - i] = acc; }
    return p;
  }
  const pTop = prefix(wTop), pBot = prefix(wBot);
  function surfaceY(p, yBottom, frac){
    const target = frac * p[p.length - 1];
    let lo = 0, hi = p.length - 1;
    while (lo < hi){ const mid = (lo + hi) >> 1; (p[mid] < target) ? lo = mid + 1 : hi = mid; }
    return yBottom - lo;
  }

  const grains = [];
  const gauss = () => (Math.random()+Math.random()+Math.random())/3 - 0.5;
  function dayFrac(){
    const n = new Date(), s = new Date(n); s.setHours(0,0,0,0);
    return Math.min(1, (n - s) / 86400000);
  }

  /* 玻璃整体剪影路径（fill/stroke 复用） */
  function glassPath(){
    ctx.beginPath();
    ctx.moveTo(cx - 10, T0);
    ctx.lineTo(cx + 10, T0);
    for (let y = T0; y <= T1; y++) ctx.lineTo(cx + wTop[y - T0], y);
    ctx.lineTo(cx + 6, B0);
    for (let y = B0; y <= B1; y++) ctx.lineTo(cx + wBot[y - B0], y);
    ctx.lineTo(cx - wBot[B1 - B0], B1);
    for (let y = B1; y >= B0; y--) ctx.lineTo(cx - wBot[y - B0], y);
    ctx.lineTo(cx - 6, T1);
    for (let y = T1; y >= T0; y--) ctx.lineTo(cx - wTop[y - T0], y);
    ctx.closePath();
  }

  /* 沙体：侧壁沿轮廓，顶面用椭圆封口（3D 圆截面） */
  function sandBody(wArr, yOff, ySurf, yBase, ry){
    const wS = wArr[Math.max(0, ySurf - yOff)];
    ctx.beginPath();
    ctx.moveTo(cx - wS, ySurf);
    for (let y = ySurf; y <= yBase; y++) ctx.lineTo(cx - wArr[y - yOff], y);
    ctx.lineTo(cx + wArr[yBase - yOff], yBase);
    for (let y = yBase; y >= ySurf; y--) ctx.lineTo(cx + wArr[y - yOff], y);
    // 前缘弧（近处边缘更低 → 立体）
    ctx.ellipse(cx, ySurf, wS, ry, 0, 0, PI, false);
    ctx.closePath();
    return wS;
  }

  function frame(){
    const e = dayFrac(), r = 1 - e;
    ctx.clearRect(0, 0, CW, CH);

    /* 纯白背景 */
    ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, CW, CH);

    /* 地面柔影（三层椭圆模拟软阴影） */
    [[120, 13, .10], [96, 10, .08], [66, 7, .07]].forEach(([rx, ry, a]) => {
      ctx.globalAlpha = a; ctx.fillStyle = "#33518f";
      ctx.beginPath(); ctx.ellipse(cx, B1 + 10, rx, ry, 0, 0, 7); ctx.fill();
    });
    ctx.globalAlpha = 1;

    /* 玻璃体：先铺体积明暗（左右暗中间亮的圆柱着色） */
    glassPath();
    const vol = ctx.createLinearGradient(cx - 130, 0, cx + 130, 0);
    vol.addColorStop(0,   "rgba(120,148,210,.20)");
    vol.addColorStop(.18, "rgba(190,208,240,.10)");
    vol.addColorStop(.42, "rgba(255,255,255,.02)");
    vol.addColorStop(.62, "rgba(210,224,248,.06)");
    vol.addColorStop(.85, "rgba(130,158,215,.16)");
    vol.addColorStop(1,   "rgba(110,138,200,.22)");
    ctx.fillStyle = vol; ctx.fill();

    /* 上仓沙体（剩余） */
    const ysT = r > 0.001 ? surfaceY(pTop, T1, r) : T1;
    if (r > 0.001){
      const wS = sandBody(wTop, T0, ysT, T1, Math.max(3, wTop[ysT - T0] * 0.2));
      const sg = ctx.createLinearGradient(cx - wS, 0, cx + wS, 0);
      sg.addColorStop(0, "#cdd9f1"); sg.addColorStop(.5, "#eef3fc"); sg.addColorStop(1, "#c3d1ec");
      ctx.fillStyle = sg; ctx.fill();
      // 顶面椭圆（受光面）+ 中央漏斗涡
      const ry = Math.max(3, wS * 0.2);
      ctx.beginPath(); ctx.ellipse(cx, ysT, wS, ry, 0, 0, 7);
      const tg = ctx.createRadialGradient(cx - wS*0.3, ysT - ry*0.5, 2, cx, ysT, wS);
      tg.addColorStop(0, "#ffffff"); tg.addColorStop(1, "#dbe5f7");
      ctx.fillStyle = tg; ctx.fill();
      ctx.strokeStyle = "rgba(140,164,220,.5)"; ctx.lineWidth = 1; ctx.stroke();
      // 漏斗涡（深色内椭圆+更深的孔）
      ctx.beginPath(); ctx.ellipse(cx, ysT + ry*0.2, wS*0.34, ry*0.4, 0, 0, 7);
      ctx.fillStyle = "rgba(148,170,222,.5)"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx, ysT + ry*0.28, wS*0.1, ry*0.14, 0, 0, 7);
      ctx.fillStyle = "rgba(92,118,180,.65)"; ctx.fill();
      // 细沙颗粒噪点
      sandBody(wTop, T0, ysT, T1, ry);
      ctx.save(); ctx.clip();
      for (let k = 0; k < 55; k++){
        const x = cx - wS + Math.random() * wS * 2, y = ysT + Math.random() * (T1 - ysT);
        ctx.globalAlpha = 0.07 + Math.random() * 0.16;
        ctx.fillStyle = Math.random() < 0.5 ? "#ffffff" : "#8fa9dd";
        ctx.fillRect(x, y, 1.2, 1.2);
      }
      ctx.globalAlpha = 1; ctx.restore();
    }

    /* 下仓沙体（已流逝） */
    const ysB = e > 0.001 ? surfaceY(pBot, B1, e) : B1;
    if (e > 0.001){
      const wS = sandBody(wBot, B0, ysB, B1, Math.max(3, wBot[ysB - B0] * 0.2));
      const sg = ctx.createLinearGradient(cx - wS - 20, 0, cx + wS + 20, 0);
      sg.addColorStop(0, "#c8d5ef"); sg.addColorStop(.5, "#ecf2fc"); sg.addColorStop(1, "#bfcfeb");
      ctx.fillStyle = sg; ctx.fill();
      // 顶面椭圆 + 中央落沙堆出的小锥
      const ry = Math.max(3, wS * 0.2);
      ctx.beginPath(); ctx.ellipse(cx, ysB, wS, ry, 0, 0, 7);
      const tg = ctx.createRadialGradient(cx - wS*0.3, ysB - ry*0.5, 2, cx, ysB, wS);
      tg.addColorStop(0, "#ffffff"); tg.addColorStop(1, "#d7e2f6");
      ctx.fillStyle = tg; ctx.fill();
      ctx.strokeStyle = "rgba(140,164,220,.5)"; ctx.lineWidth = 1; ctx.stroke();
      if (e < 1 && ysB > B0 + 26){
        // 小沙锥（受光左亮右暗，只在沙面离颈口足够远时出现）
        const mh = Math.min(12, 6 + (B1 - ysB) * 0.04);
        const cone = ctx.createLinearGradient(cx - 16, 0, cx + 16, 0);
        cone.addColorStop(0, "#f4f7fd"); cone.addColorStop(.55, "#dde7f8"); cone.addColorStop(1, "#c2d1ec");
        ctx.fillStyle = cone;
        ctx.beginPath();
        ctx.moveTo(cx - 17, ysB + 1);
        ctx.quadraticCurveTo(cx - 4, ysB - mh, cx, ysB - mh - 1);
        ctx.quadraticCurveTo(cx + 4, ysB - mh, cx + 17, ysB + 1);
        ctx.closePath(); ctx.fill();
      }
      // 细沙颗粒噪点
      sandBody(wBot, B0, ysB, B1, ry);
      ctx.save(); ctx.clip();
      for (let k = 0; k < 90; k++){
        const x = cx - wS + Math.random() * wS * 2, y = ysB + Math.random() * (B1 - ysB);
        ctx.globalAlpha = 0.06 + Math.random() * 0.15;
        ctx.fillStyle = Math.random() < 0.5 ? "#ffffff" : "#8fa9dd";
        ctx.fillRect(x, y, 1.2, 1.2);
      }
      ctx.globalAlpha = 1; ctx.restore();
    }

    /* 颈口细流 + 粒子 */
    if (e < 1){
      const grad = ctx.createLinearGradient(0, T1, 0, ysB);
      grad.addColorStop(0, "rgba(168,188,235,.95)");
      grad.addColorStop(1, "rgba(168,188,235,.3)");
      ctx.strokeStyle = grad; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cx, T1 + 2); ctx.lineTo(cx, ysB - 2); ctx.stroke();
      for (let k = 0; k < 3; k++){
        grains.push({ x: cx + gauss() * 2, y: B0 - 10 + Math.random() * 6,
                      vx: gauss() * 0.3, vy: 1.2 + Math.random() * 0.8, r: 0.5 + Math.random() * 0.6 });
      }
      for (let i = grains.length - 1; i >= 0; i--){
        const g = grains[i];
        g.vy += 0.06; g.x += g.vx; g.y += g.vy;
        if (g.y >= ysB - 1){ grains.splice(i, 1); continue; }
        ctx.globalAlpha = 0.85; ctx.fillStyle = "#b6c8ec";
        ctx.fillRect(g.x, g.y, g.r * 1.6, g.r * 1.6);
      }
      ctx.globalAlpha = 1;
    }

    /* 玻璃轮廓：外圈冷色描边 + 内圈白色内壁（双层玻璃厚度感） */
    glassPath();
    ctx.strokeStyle = "rgba(96,126,195,.55)"; ctx.lineWidth = 2; ctx.lineJoin = "round";
    ctx.stroke();
    ctx.save();
    ctx.translate(cx, (T0 + B1) / 2);
    ctx.scale(0.965, 0.972);
    ctx.translate(-cx, -(T0 + B1) / 2);
    glassPath();
    ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 1.2;
    ctx.stroke();
    ctx.restore();

    /* 顶口小椭圆（3D 开口截面） */
    ctx.beginPath(); ctx.ellipse(cx, T0, 10, 3, 0, 0, 7);
    ctx.strokeStyle = "rgba(96,126,195,.5)"; ctx.lineWidth = 1.4; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, T0, 10, 3, 0, 0, 7);
    ctx.fillStyle = "rgba(214,226,248,.6)"; ctx.fill();
    /* 底部椭圆基座截面 */
    ctx.beginPath(); ctx.ellipse(cx, B1, wBot[B1 - B0], 7, 0, PI * 0.02, PI * 0.98);
    ctx.strokeStyle = "rgba(96,126,195,.35)"; ctx.lineWidth = 1.2; ctx.stroke();

    /* 镜面高光：左侧主高光（核心亮线+柔光）、右侧窄反光、两颗光斑 */
    // 上球
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 9;
    ctx.beginPath(); ctx.moveTo(cx - 64, 70); ctx.quadraticCurveTo(cx - 84, 116, cx - 52, 178); ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.95)"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx - 62, 74); ctx.quadraticCurveTo(cx - 80, 116, cx - 52, 172); ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.6)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx + 66, 88); ctx.quadraticCurveTo(cx + 76, 118, cx + 62, 156); ctx.stroke();
    // 下球
    ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 10;
    ctx.beginPath(); ctx.moveTo(cx - 82, 286); ctx.quadraticCurveTo(cx - 108, 340, cx - 66, 398); ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.95)"; ctx.lineWidth = 3.2;
    ctx.beginPath(); ctx.moveTo(cx - 80, 290); ctx.quadraticCurveTo(cx - 103, 340, cx - 66, 392); ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(cx + 88, 306); ctx.quadraticCurveTo(cx + 100, 344, cx + 82, 386); ctx.stroke();
    // 光斑
    [[cx - 46, 92, 7], [cx - 58, 314, 9]].forEach(([x, y, rr]) => {
      const sp = ctx.createRadialGradient(x, y, 0, x, y, rr);
      sp.addColorStop(0, "rgba(255,255,255,.95)"); sp.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sp; ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill();
    });
    // 颈口阴影收紧
    ctx.strokeStyle = "rgba(96,126,195,.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(cx - 7, T1 + 4); ctx.quadraticCurveTo(cx, T1 + 10, cx + 7, T1 + 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - 7, B0 - 4); ctx.quadraticCurveTo(cx, B0 - 10, cx + 7, B0 - 4); ctx.stroke();

    /* 实时百分比 */
    ctx.font = "11px Consolas, monospace"; ctx.textAlign = "right";
    ctx.fillStyle = "#5b6a8c";
    ctx.fillText(`REMAIN ${(r * 100).toFixed(1)}%`, CW - 6, T0 + 4);
    ctx.fillStyle = "#1249e2";
    ctx.fillText(`ELAPSED ${(e * 100).toFixed(1)}%`, CW - 6, CH - 10);

    /* 毫秒副屏 */
    const msEl = document.getElementById("clockMs");
    if (msEl) msEl.textContent = String(new Date().getMilliseconds()).padStart(3, "0");

    requestAnimationFrame(frame);
  }
  frame();
})();

/* ---------- heatmap ---------- */
function levelOf(n){
  if (!n) return 0;
  if (n <= 800) return 1;
  if (n <= 1500) return 2;
  if (n <= 2200) return 3;
  return 4;
}
function renderHeatmap(){
  const grid = $("#hmGrid"), months = $("#hmMonths"), days = $("#hmDays"), tip = $("#hmTip");
  grid.innerHTML = ""; months.innerHTML = ""; days.innerHTML = "";
  I18N[lang].dows.forEach(d => { const s = document.createElement("span"); s.textContent = d; days.appendChild(s); });
  const year = 2026;
  const start = new Date(year, 0, 1);
  const startDow = (start.getDay() + 6) % 7;
  const gridStart = new Date(start); gridStart.setDate(start.getDate() - startDow);
  const end = new Date(year, 11, 31);
  const today = new Date(STATS.asof + "T23:59:59");
  let cur = new Date(gridStart), col = 0, lastMonth = -1;
  const monthCols = [];
  while (cur <= end){
    for (let row=0; row<7 && cur <= end; row++){
      const iso = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,"0")}-${String(cur.getDate()).padStart(2,"0")}`;
      const cell = document.createElement("i");
      const n = STATS.daily[iso] || 0;
      if (cur < start){ cell.className = "cell"; cell.style.visibility = "hidden"; }
      else if (cur > today){ cell.className = "cell future"; }
      else {
        cell.className = "cell l" + levelOf(n) + (n ? " hit" : "");
        if (n){
          cell.dataset.tip = `${iso} · ${n.toLocaleString()} ${T("tip.msgs")}`;
          cell.addEventListener("mousemove", e => {
            tip.textContent = cell.dataset.tip;
            tip.style.opacity = 1;
            tip.style.left = (e.clientX + 14) + "px";
            tip.style.top = (e.clientY - 12) + "px";
          });
          cell.addEventListener("mouseleave", () => tip.style.opacity = 0);
        }
      }
      grid.appendChild(cell);
      if (row === 0 && cur.getMonth() !== lastMonth && cur >= start){
        monthCols.push({ col, m: cur.getMonth() });
        lastMonth = cur.getMonth();
      }
      cur.setDate(cur.getDate() + 1);
    }
    col++;
  }
  months.style.gridTemplateColumns = `repeat(${col}, 16px)`;
  let mi = 0;
  for (let c=0; c<col; c++){
    const s = document.createElement("span");
    if (mi < monthCols.length && monthCols[mi].col === c){
      s.textContent = I18N[lang].months[monthCols[mi].m]; mi++;
    }
    months.appendChild(s);
  }
}

/* ---------- finance rows：欧美简洁行式排版 ---------- */
function renderFinance(){
  $("#finGrid").innerHTML = FINANCE.map((f,i) => {
    const [title, desc] = f[lang] || f.zh;
    const tag = f.link ? "a" : "div";
    const href = f.link ? ` href="${f.link}"` : "";
    const more = f.link ? `<span class="fin-more mono">${T("pj.more")}</span>` : "";
    return `<${tag}${href} class="fin-row${f.link ? " fin-linked" : ""}">
      <span class="fin-idx mono">${String(i+1).padStart(2,"0")}</span>
      <div>
        <h3 class="fin-name">${title}</h3><span class="fin-tag mono">${f.tag}</span>
        <p class="fin-desc">${desc}</p>${more}
      </div>
      <span class="fin-ts mono">${f.ts}</span>
    </${tag}>`;
  }).join("");
}

/* ---------- projects ---------- */
let activeCat = "all";
const CATS = ["all","ai","tool","kb","life"];
function renderFilters(){
  $("#pjFilter").innerHTML = CATS.map(c =>
    `<button data-cat="${c}" class="${c===activeCat?"active":""}">${T("filter."+c)}</button>`).join("");
  $$("#pjFilter button").forEach(b => b.addEventListener("click", () => {
    activeCat = b.dataset.cat; renderFilters(); renderProjects();
  }));
}
function renderProjects(){
  const list = PROJECTS
    .filter(p => activeCat === "all" || p.cat === activeCat)
    .sort((a,b) => (b.link?1:0) - (a.link?1:0) || b.ts.localeCompare(a.ts));
  $("#pjGrid").innerHTML = list.map((p,i) => {
    const [title] = p[lang] || p.zh;
    const desc = p.locked ? `<span class="pj-lock mono">${T("pj.private")}</span>` : (p[lang] || p.zh)[1];
    const status = p.locked ? "" : `<div class="pj-status mono ${p.wip?"wip":""}">${p.wip?T("status.wip"):T("status.done")}</div>`;
    const more = p.link ? `<div class="pj-more mono">${T("pj.more")}</div>` : "";
    const tag = p.link ? "a" : "article";
    const href = p.link ? ` href="${p.link}"` : "";
    return `<${tag}${href} class="pj-card${p.link ? " pj-linked" : ""} reveal in" style="transition-delay:${i*35}ms">
      <div class="pj-top"><span class="pj-cat mono">${T("filter."+p.cat).toUpperCase()}</span>
      <span class="pj-ts mono">⏱ ${p.ts}</span></div>
      <h3>${title}</h3><p>${desc}</p>${status}${more}
    </${tag}>`;
  }).join("");
}

/* ---------- 留言表单：FormSubmit 免费直投 Gmail，失败时兜底打开邮件客户端 ---------- */
$("#msgForm").addEventListener("submit", async ev => {
  ev.preventDefault();
  const btn = $("#cfSend"), st = $("#cfStatus");
  const name = $("#cfName").value.trim(), reply = $("#cfReply").value.trim(), msg = $("#cfMsg").value.trim();
  btn.disabled = true; st.textContent = "…";
  try {
    const res = await fetch("https://formsubmit.co/ajax/cindyhan9688@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ name, reply_to: reply, message: msg, _subject: "作品集网站新留言 · " + name })
    });
    if (!res.ok) throw new Error(res.status);
    st.textContent = T("ct.sent");
    $("#msgForm").reset();
  } catch (e) {
    st.textContent = T("ct.fail");
    location.href = "mailto:cindyhan9688@gmail.com?subject=" +
      encodeURIComponent("来自作品集网站的留言") + "&body=" +
      encodeURIComponent(`${name} (${reply})\n\n${msg}`);
  }
  btn.disabled = false;
});

/* ---------- 🍓 点击迸发：草莓 + 白色星光 ---------- */
addEventListener("pointerdown", e => {
  for (let i = 0; i < 12; i++){
    const berry = i % 3 === 0;
    const el = document.createElement("span");
    el.className = "bp " + (berry ? "bp-berry" : "bp-spark");
    if (berry) el.textContent = "🍓";
    el.style.left = e.clientX + "px";
    el.style.top = e.clientY + "px";
    document.body.appendChild(el);
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 75;
    const dx = Math.cos(a) * d, dy = Math.sin(a) * d;
    el.animate([
      { transform: "translate(-50%,-50%) scale(1) rotate(0deg)", opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 46}px)) scale(${berry ? 1.15 : 0.35}) rotate(${(Math.random()*140-70)|0}deg)`, opacity: 0 }
    ], { duration: 650 + Math.random() * 450, easing: "cubic-bezier(.16,.8,.3,1)" }).onfinish = () => el.remove();
  }
});

/* ---------- copy email ---------- */
$("#copyMail").addEventListener("click", async () => {
  try { await navigator.clipboard.writeText("cindyhan9688@gmail.com"); } catch(e){}
  const btn = $("#copyMail"); btn.textContent = T("ct.copied");
  setTimeout(() => btn.textContent = T("ct.copy"), 1600);
});

/* ---------- scroll: progress + reveal ---------- */
addEventListener("scroll", () => {
  const h = document.documentElement;
  $("#scrollProgress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
}, { passive: true });

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

/* ---------- boot ---------- */
applyLang();
animateHours();
