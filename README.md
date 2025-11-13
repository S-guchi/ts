# TypeScript 学習記録

TypeScriptの学習を記録していくプロジェクトです。

## ディレクトリ構成

```
ts/
├── lessons/       # 学習トピックごとのレッスン
├── exercises/     # 練習問題
└── notes/         # 学習メモ
```

## 学習トピック

### 01. コールバック関数
- ガイド: [lessons/01-callbacks/guide.md](lessons/01-callbacks/guide.md)
- サンプルコード: [lessons/01-callbacks/examples.ts](lessons/01-callbacks/examples.ts)
- 練習問題: [lessons/01-callbacks/exercise.ts](lessons/01-callbacks/exercise.ts)
- 解答: [lessons/01-callbacks/answer.ts](lessons/01-callbacks/answer.ts)

```bash
# 練習問題に挑戦
npx ts-node lessons/01-callbacks/exercise.ts

# 解答を確認
npx ts-node lessons/01-callbacks/answer.ts

# サンプルコードを実行
npx ts-node lessons/01-callbacks/examples.ts
```

## 使い方

### 新しいレッスンを追加する

```bash
mkdir -p lessons/02-topic-name
# guide.md, examples.ts, exercise.ts, answer.ts を作成
```

### TypeScriptファイルを実行

```bash
npx ts-node <ファイルパス>
```
