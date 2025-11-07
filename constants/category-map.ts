type TagInfo = {
  tag: string;
  title: string;
  subtitle: string;
};

export const CATEGORY_MAP: Record<string, TagInfo[]> = {
  "🎓 アカデミック": [
    { tag: "MainEvent_TEST", title: "リサーチ＆プロジェクト", subtitle: "知の探求" },
    { tag: "SubEvent_TEST", title: "プレゼンテーション", subtitle: "研究成果の発表" }
  ],
  "🎉 エンターテイメント": [
  ],
  "🤝🏻 ブース＆コラボ": [
  ],
  "🎨 クリエイティブ": [
  ],
  "🔎 リサーチアンドプロジェクト": [
  ],
  "🧳 フィールドワーク": [
  ],
  "📖 プレゼンテーション": [
  ],
  "❓ その他": [
  ],
};

export const CATEGORY_NAMES = Object.keys(CATEGORY_MAP);