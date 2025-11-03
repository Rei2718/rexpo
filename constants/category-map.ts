type TagInfo = {
  tag: string;
  title: string;
  subtitle: string;
};

export const CATEGORY_MAP: Record<string, TagInfo[]> = {
  "🎓 アカデミック": [
    { tag: "テストタグ-ファースト", title: "リサーチ＆プロジェクト", subtitle: "知の探求" },
    { tag: "テストタグ-セカンド", title: "プレゼンテーション", subtitle: "研究成果の発表" }
  ],
  "🎉 エンターテイメント": [
    { tag: "ライブ", title: "ライブステージ", subtitle: "音楽とパフォーマンス" },
    { tag: "ゲーム", title: "ゲーム体験", subtitle: "最新のインタラクティブ" }
  ],
  "🤝🏻 ブース＆コラボ": [
    { tag: "ブース", title: "展示ブース", subtitle: "企業・団体による出展" },
    { tag: "コラボ", title: "コラボ企画", subtitle: "特別な連携プロジェクト" }
  ],
  "🎨 クリエイティブ": [
    { tag: "アート", title: "アート作品", subtitle: "学生による創作" },
    { tag: "デザイン", title: "デザイン展示", subtitle: "機能美と創造性" }
  ],
  "🔎 リサーチアンドプロジェクト": [
    { tag: "リサーチ", title: "リサーチ発表", subtitle: "専門分野の研究" },
    { tag: "プロジェクト", title: "プロジェクト展示", subtitle: "実践的な取り組み" }
  ],
  "🧳 フィールドワーク": [
    { tag: "地域連携", title: "地域連携", subtitle: "社会とのつながり" },
    { tag: "調査研究", title: "調査研究", subtitle: "現場からのレポート" }
  ],
  "📖 プレゼンテーション": [
    { tag: "発表会", title: "研究発表会", subtitle: "学びの集大成" },
    { tag: "講演", title: "特別講演", subtitle: "ゲストスピーカーによる洞察" }
  ],
  "❓ その他": [
    { tag: "その他", title: "その他のイベント", subtitle: "カテゴリ分類外" },
  ],
};

export const CATEGORY_NAMES = Object.keys(CATEGORY_MAP);