/**
 * JavaScriptの非同期処理とコールバック - 解答例
 */

console.log("=== 問題1の解答 ===");
console.log("正解: A → C → E → B → D");
console.log("");

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

setTimeout(() => {
  console.log("D");
}, 100);

console.log("E");

console.log("");
console.log("【解説】");
console.log("- console.logは同期処理なので即座に実行される");
console.log("- setTimeoutはメッセージキューに追加される");
console.log("- コールスタックが空になった後、キューの処理が実行される");
console.log("- 0msのsetTimeoutも最低1回イベントループを経由する");


setTimeout(() => {
  console.log("\n=== 問題2の解答 ===");

  console.log("開始");

  setTimeout(() => {
    console.log("setTimeoutの中");
  }, 0);

  for (let i = 0; i < 3; i++) {
    console.log(`ループ ${i}`);
  }

  console.log("終了");

  // 正解: 開始 → ループ0 → ループ1 → ループ2 → 終了 → setTimeoutの中
  // 理由:
  // - setTimeout(fn, 0)は「0ms後に実行」ではなく「できるだけ早くメッセージキューに追加」
  // - イベントループはコールスタックが完全に空になるまで待つ
  // - 同期処理（forループなど）が全て終わってから、キューの処理が実行される
}, 500);


setTimeout(() => {
  console.log("\n=== 問題3の解答 ===");

  function delayedGreeting(name: string, delayMs: number, callback: (message: string) => void) {
    setTimeout(() => {
      const message = `こんにちは、${name}さん！`;
      callback(message);
    }, delayMs);
  }

  console.log("挨拶を準備中...");
  delayedGreeting("太郎", 1000, (message) => {
    console.log(message);
  });
  console.log("準備完了");

  // 出力順序: 挨拶を準備中... → 準備完了 → こんにちは、太郎さん！
}, 1500);


setTimeout(() => {
  console.log("\n=== 問題4の解答 ===");

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

  console.log("処理開始");

  // コールバック地獄の例
  step1(() => {
    step2(() => {
      step3(() => {
        console.log("全ての処理が完了しました");
      });
    });
  });

  // このような入れ子構造が深くなると:
  // - 可読性が低下する
  // - エラーハンドリングが困難になる
  // - コードの保守が難しくなる
  // この問題を解決するためにPromiseやasync/awaitが導入された
}, 3000);


setTimeout(() => {
  console.log("\n=== 問題5の解答 ===");

  function fetchData(
    url: string,
    callback: (error: Error | null, data?: string) => void
  ) {
    setTimeout(() => {
      if (url === "") {
        // エラーの場合は第1引数にErrorオブジェクトを渡す
        callback(new Error("URLが空です"));
      } else {
        // 成功の場合は第1引数にnull、第2引数にデータを渡す
        callback(null, `${url}からのデータ`);
      }
    }, 1000);
  }

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

  // error-firstコールバックパターン:
  // - Node.jsで広く使われている慣習
  // - コールバックの第1引数は常にerror（成功時はnull）
  // - 第2引数以降にデータを渡す
  // - エラーハンドリングを統一的に行える
}, 7000);


setTimeout(() => {
  console.log("\n=== ボーナス問題の解答 ===");

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

  // 正解: 1 → 5 → 2 → 4 → 3
  // 理由:
  // 1. "1"と"5"は同期処理なので即座に実行
  // 2. 最初の2つのsetTimeoutがメッセージキューに追加される（登録順）
  // 3. コールスタックが空になり、最初のsetTimeout（"2"を出力）が実行される
  // 4. "2"の中で新しいsetTimeout（"3"）がキューに追加される
  // 5. 次のキューの項目（"4"）が実行される
  // 6. 最後に"3"が実行される
}, 10000);


setTimeout(() => {
  console.log("\n=== まとめ ===");
  console.log("これらの問題を解くことで、以下の重要な概念を理解できました:");
  console.log("- コールスタック: 現在実行中の関数を管理");
  console.log("- メッセージキュー: 実行待ちのコールバック関数を保存");
  console.log("- イベントループ: スタックが空になったらキューの処理を実行");
  console.log("- コールバック関数: 非同期処理の完了時に実行される関数");
  console.log("- ノンブロッキングI/O: 処理の完了を待たずに次の処理を実行");
  console.log("\n次のステップ: Promiseとasync/awaitを学んで、コールバック地獄を解決しましょう！");

  // プロセスを正常終了させる
  process.exit(0);
}, 11000);
