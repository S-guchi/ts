# コールバック関数 完全ガイド

## コールバック関数とは？

**コールバック関数**とは、**他の関数に引数として渡される関数**のことです。
「後で呼び出してね（call back）」という意味で、処理の完了時や特定のタイミングで実行されます。

## 基本的な例

### 例1: 同期的なコールバック

```typescript
function greet(name: string, callback: (message: string) => void) {
  const message = `こんにちは、${name}さん！`;
  callback(message);  // ここでコールバック関数を呼び出す
}

// 使い方
greet("太郎", (message) => {
  console.log(message);  // このアロー関数がコールバック関数
});

// 出力: こんにちは、太郎さん！
```

**ポイント:**
- `(message) => { console.log(message); }` がコールバック関数
- `greet`関数は、処理が終わったら`callback`を呼び出す
- コールバック関数は引数として渡されている

### 例2: 非同期的なコールバック

```typescript
function delayedGreet(name: string, callback: (message: string) => void) {
  setTimeout(() => {
    const message = `こんにちは、${name}さん！`;
    callback(message);  // 1秒後に呼び出される
  }, 1000);
}

console.log("開始");
delayedGreet("太郎", (message) => {
  console.log(message);
});
console.log("終了");

// 出力順序:
// 開始
// 終了
// こんにちは、太郎さん！ (1秒後)
```

## なぜコールバック関数が必要なのか？

### 理由1: 非同期処理の結果を受け取るため

JavaScriptでは、時間がかかる処理（API通信、ファイル読み込みなど）は非同期で実行されます。
処理が完了したタイミングで結果を受け取るために、コールバック関数を使います。

```typescript
// ❌ これでは結果を受け取れない
function fetchData() {
  setTimeout(() => {
    return "データ";  // この値は誰も受け取れない
  }, 1000);
}

const data = fetchData();  // undefined

// ✅ コールバックを使えば結果を受け取れる
function fetchData(callback: (data: string) => void) {
  setTimeout(() => {
    callback("データ");  // コールバックに渡す
  }, 1000);
}

fetchData((data) => {
  console.log(data);  // "データ" が表示される
});
```

### 理由2: 処理をカスタマイズできる

同じ関数でも、コールバックを変えることで異なる動作を実現できます。

```typescript
function processNumbers(numbers: number[], callback: (n: number) => void) {
  numbers.forEach(n => callback(n));
}

// 使い方1: 2倍にする
processNumbers([1, 2, 3], (n) => {
  console.log(n * 2);  // 2, 4, 6
});

// 使い方2: 平方する
processNumbers([1, 2, 3], (n) => {
  console.log(n * n);  // 1, 4, 9
});
```

## コールバック関数の書き方

### 方法1: アロー関数（最も一般的）

```typescript
doSomething((result) => {
  console.log(result);
});
```

### 方法2: 名前付き関数

```typescript
function handleResult(result: string) {
  console.log(result);
}

doSomething(handleResult);
```

### 方法3: 無名関数

```typescript
doSomething(function(result) {
  console.log(result);
});
```

## コールバック関数の実践例

### 例1: 配列の処理

```typescript
const numbers = [1, 2, 3, 4, 5];

// forEach のコールバック
numbers.forEach((num) => {
  console.log(num * 2);
});

// map のコールバック
const doubled = numbers.map((num) => {
  return num * 2;
});

// filter のコールバック
const evens = numbers.filter((num) => {
  return num % 2 === 0;
});
```

### 例2: イベントリスナー（ブラウザ）

```typescript
// ボタンクリック時のコールバック
button.addEventListener('click', (event) => {
  console.log('ボタンがクリックされました！');
});
```

### 例3: API呼び出し（Node.js風）

```typescript
function fetchUserData(userId: number, callback: (error: Error | null, data?: any) => void) {
  // 疑似的なAPI呼び出し
  setTimeout(() => {
    if (userId <= 0) {
      callback(new Error('無効なユーザーID'));
    } else {
      callback(null, { id: userId, name: '太郎' });
    }
  }, 1000);
}

// 使い方
fetchUserData(1, (error, data) => {
  if (error) {
    console.log('エラー:', error.message);
  } else {
    console.log('ユーザー:', data);
  }
});
```

## Error-First コールバックパターン

Node.jsで広く使われる慣習です。

```typescript
function asyncOperation(callback: (error: Error | null, result?: string) => void) {
  // 処理...
  if (/* エラーが発生 */) {
    callback(new Error('エラーメッセージ'));
  } else {
    callback(null, '成功時のデータ');
  }
}

// 使い方
asyncOperation((error, result) => {
  if (error) {
    // エラー処理
    console.error(error);
    return;
  }
  // 正常時の処理
  console.log(result);
});
```

**ルール:**
1. コールバックの第1引数は常に `error`（エラーがない場合は `null`）
2. 第2引数以降に成功時のデータを渡す
3. エラーチェックを統一的に行える

## コールバック地獄（Callback Hell）

複数の非同期処理を連鎖させると、ネストが深くなります。

```typescript
// ❌ コールバック地獄の例
step1((result1) => {
  step2(result1, (result2) => {
    step3(result2, (result3) => {
      step4(result3, (result4) => {
        step5(result4, (result5) => {
          console.log('ようやく完了...');
        });
      });
    });
  });
});
```

**問題点:**
- 可読性が低い
- エラーハンドリングが難しい
- コードの保守が困難

**解決策:**
- Promise を使う
- async/await を使う

## コールバック vs Promise vs async/await

### コールバック版

```typescript
fetchData((error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
```

### Promise版

```typescript
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### async/await版

```typescript
try {
  const data = await fetchData();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

## まとめ

### コールバック関数の特徴

✅ **良い点:**
- シンプルで理解しやすい
- JavaScriptの基本的な仕組み
- 柔軟性が高い

❌ **悪い点:**
- ネストが深くなりやすい（コールバック地獄）
- エラーハンドリングが煩雑
- 複数の非同期処理の制御が難しい

### 使い分け

- **コールバック**: シンプルな非同期処理、イベントリスナー、配列メソッド
- **Promise**: 複数の非同期処理を連鎖させる場合
- **async/await**: 複雑な非同期処理を同期的に書きたい場合

### 覚えておくべきポイント

1. コールバック関数は「引数として渡される関数」
2. 非同期処理の結果を受け取るために使う
3. setTimeout, forEach, addEventListener などで広く使われている
4. error-first パターンはNode.jsの慣習
5. コールバック地獄を避けるために Promise や async/await を検討する

---

次のステップ: [Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise) と [async/await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function) を学ぶことをお勧めします！
