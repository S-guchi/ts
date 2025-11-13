/**
 * JavaScriptの非同期処理とコールバック - 学習問題
 * 想定時間: 15分
 *
 * 各問題を解いて、実行結果を確認してください。
 * `npx ts-node exercise.ts` で実行できます。
 */

console.log("=== 問題1: 実行順序の予測 ===");
console.log("以下のコードの実行順序を予測してください");
console.log("");

// 問題1: このコードを実行すると、どの順番で出力されるでしょうか？
// A, B, C, D, E の順番を予測してから、コメントを外して確認してください

console.log("予測を記入してください: A, C, E, B, D");
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

setTimeout(() => {
  console.log("D");
}, 100);

console.log("E");

// あなたの予測: ___________________
// 実際の結果: ___________________

console.log("\n=== 問題2: setTimeoutの動作理解 ===");

// 問題2: setTimeout の遅延時間を0msに設定しても、
// なぜ即座に実行されないのでしょうか？
// 理由を考えてから、以下のコメントを外して確認してください

/*
console.log("開始");

setTimeout(() => {
  console.log("setTimeoutの中");
}, 0);

for (let i = 0; i < 3; i++) {
  console.log(`ループ ${i}`);
}

console.log("終了");
*/

// あなたの理由: 非同期処理は同期処理が全て終わり次第実行されるから


console.log("\n=== 問題3: コールバック関数の実装 ===");

// 問題3: 以下の関数を完成させてください
// delayedGreeting関数は、指定したミリ秒後に挨拶メッセージを
// コールバック関数に渡して実行します

function delayedGreeting(name: string, delayMs: number, callback: (message: string) => void) {
  // ここにコードを書いてください
  // ヒント: setTimeoutを使用します
  setTimeout(() => {
    const message = `こんにちは、${name}さん！`
    callback(message)
  }, delayMs);
}

// テストコード（コメントを外して確認）
console.log("挨拶を準備中...");
delayedGreeting("太郎", 1000, (message) => {
  console.log(message); // "こんにちは、太郎さん！" が1秒後に表示されるはず
});
console.log("準備完了");



console.log("\n=== 問題4: コールバック地獄の体験 ===");

// 問題4: 以下の連続した非同期処理を実装してください
// step1 → step2 → step3 の順に実行され、各ステップで1秒待機します

function step1(callback: () => void) {
  setTimeout(() => {
    console.log("ステップ1完了");
    callback();
  }, 1000);
}

function step2(callback: () => void) {
  setTimeout(() => {
    console.log("ステップ2完了");
    callback();
  }, 1000);
}

function step3(callback: () => void) {
  setTimeout(() => {
    console.log("ステップ3完了");
    callback();
  }, 1000);
}

// ここに3つのステップを順番に実行するコードを書いてください
// コールバック地獄（深い入れ子）になることを体験しましょう

/*
console.log("処理開始");
// ここにコードを書く

*/


console.log("\n=== 問題5: エラーハンドリング付きコールバック ===");

// 問題5: エラーハンドリングを含むコールバック関数を実装してください
// Node.jsの慣習的な「error-firstコールバック」パターンを使用します

function fetchData(
  url: string,
  callback: (error: Error | null, data?: string) => void
) {
  // urlが空文字列の場合はエラーを返す
  // それ以外の場合は1秒後にダミーデータを返す
  // ここにコードを書いてください
}

// テストコード（コメントを外して確認）
/*
fetchData("https://example.com", (error, data) => {
  if (error) {
    console.log("エラー:", error.message);
  } else {
    console.log("データ:", data);
  }
});

fetchData("", (error, data) => {
  if (error) {
    console.log("エラー:", error.message);
  } else {
    console.log("データ:", data);
  }
});
*/


console.log("\n=== ボーナス問題: イベントループの理解 ===");

// ボーナス問題: 以下のコードの実行順序を予測してください
// より複雑なパターンです

/*
console.log("1");

setTimeout(() => {
  console.log("2");
  setTimeout(() => {
    console.log("3");
  }, 0);
}, 0);

setTimeout(() => {
  console.log("4");
}, 0);

console.log("5");
*/

// あなたの予測: ___________________
// 実際の結果: ___________________


console.log("\n=== 学習のまとめ ===");
console.log("この問題を通して以下を学びました:");
console.log("1. JavaScriptはシングルスレッドで動作する");
console.log("2. setTimeoutは即座に実行されず、メッセージキューに追加される");
console.log("3. イベントループがコールスタックを監視し、空になったらキューの処理を実行する");
console.log("4. コールバック関数は非同期処理の結果を受け取る仕組み");
console.log("5. 複数の非同期処理を連鎖させるとコールバック地獄になる");
