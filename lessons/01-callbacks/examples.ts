/**
 * コールバック関数の実践例集
 * 各例を順番に実行して理解を深めましょう
 */

console.log("========================================");
console.log("例1: 基本的なコールバック（同期）");
console.log("========================================\n");

function executeOperation(a: number, b: number, operation: (x: number, y: number) => number) {
  const result = operation(a, b);
  console.log(`結果: ${result}`);
}

// 足し算のコールバック
executeOperation(5, 3, (x, y) => {
  return x + y;
});

// 掛け算のコールバック
executeOperation(5, 3, (x, y) => {
  return x * y;
});

console.log("\n========================================");
console.log("例2: 配列のコールバック");
console.log("========================================\n");

const numbers = [1, 2, 3, 4, 5];

console.log("元の配列:", numbers);

// forEach: 各要素に対して処理を実行
console.log("\nforEach - 各要素を2倍にして表示:");
numbers.forEach((num) => {
  console.log(num * 2);
});

// map: 各要素を変換して新しい配列を作成
console.log("\nmap - 各要素を2倍:");
const doubled = numbers.map((num) => {
  return num * 2;
});
console.log(doubled);

// filter: 条件に合う要素だけを抽出
console.log("\nfilter - 偶数だけを抽出:");
const evens = numbers.filter((num) => {
  return num % 2 === 0;
});
console.log(evens);

// reduce: 累積処理
console.log("\nreduce - 合計を計算:");
const sum = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);
console.log(sum);


setTimeout(() => {
  console.log("\n========================================");
  console.log("例3: 非同期コールバック - setTimeout");
  console.log("========================================\n");

  console.log("1. 処理開始");

  setTimeout(() => {
    console.log("2. 1秒後に実行されました");
  }, 1000);

  console.log("3. 処理継続（setTimeoutの完了を待たない）");

  // 出力順序: 1 → 3 → 2
}, 500);


setTimeout(() => {
  console.log("\n========================================");
  console.log("例4: コールバックで値を返す");
  console.log("========================================\n");

  function fetchUserName(userId: number, callback: (name: string) => void) {
    // データベースから取得する疑似処理
    setTimeout(() => {
      const users: { [key: number]: string } = {
        1: "太郎",
        2: "花子",
        3: "次郎"
      };
      const name = users[userId] || "不明";
      callback(name);  // コールバックに名前を渡す
    }, 1000);
  }

  console.log("ユーザー情報を取得中...");

  fetchUserName(2, (name) => {
    console.log(`取得完了: ${name}さん`);
  });
}, 2000);


setTimeout(() => {
  console.log("\n========================================");
  console.log("例5: Error-First コールバック");
  console.log("========================================\n");

  function divide(
    a: number,
    b: number,
    callback: (error: Error | null, result?: number) => void
  ) {
    setTimeout(() => {
      if (b === 0) {
        // エラーの場合
        callback(new Error("0で割ることはできません"));
      } else {
        // 成功の場合
        callback(null, a / b);
      }
    }, 500);
  }

  // 正常なケース
  divide(10, 2, (error, result) => {
    if (error) {
      console.log("エラー:", error.message);
    } else {
      console.log("10 ÷ 2 =", result);
    }
  });

  // エラーケース
  divide(10, 0, (error, result) => {
    if (error) {
      console.log("エラー:", error.message);
    } else {
      console.log("結果:", result);
    }
  });
}, 4000);


setTimeout(() => {
  console.log("\n========================================");
  console.log("例6: 複数のコールバックを順番に実行");
  console.log("========================================\n");

  function step1(callback: (result: string) => void) {
    setTimeout(() => {
      console.log("ステップ1: データ取得開始");
      callback("データA");
    }, 500);
  }

  function step2(data: string, callback: (result: string) => void) {
    setTimeout(() => {
      console.log(`ステップ2: ${data}を処理中`);
      callback(`処理済み${data}`);
    }, 500);
  }

  function step3(data: string, callback: (result: string) => void) {
    setTimeout(() => {
      console.log(`ステップ3: ${data}を保存中`);
      callback(`保存完了: ${data}`);
    }, 500);
  }

  // 順番に実行（ネストが深くなる = コールバック地獄）
  step1((result1) => {
    step2(result1, (result2) => {
      step3(result2, (result3) => {
        console.log("最終結果:", result3);
      });
    });
  });
}, 5500);


setTimeout(() => {
  console.log("\n========================================");
  console.log("例7: コールバックの実用例 - リトライ処理");
  console.log("========================================\n");

  function fetchDataWithRetry(
    maxRetries: number,
    callback: (error: Error | null, data?: string) => void
  ) {
    let attempts = 0;

    function attempt() {
      attempts++;
      console.log(`試行 ${attempts}/${maxRetries}`);

      // 70%の確率で成功する疑似処理
      const success = Math.random() > 0.3;

      setTimeout(() => {
        if (success) {
          callback(null, "データ取得成功！");
        } else if (attempts < maxRetries) {
          console.log("失敗しました。リトライします...");
          attempt();  // 再試行
        } else {
          callback(new Error("最大リトライ回数に達しました"));
        }
      }, 500);
    }

    attempt();
  }

  fetchDataWithRetry(3, (error, data) => {
    if (error) {
      console.log("最終結果:", error.message);
    } else {
      console.log("最終結果:", data);
    }
  });
}, 8000);


setTimeout(() => {
  console.log("\n========================================");
  console.log("例8: コールバック vs Promise の比較");
  console.log("========================================\n");

  // コールバック版
  function fetchDataCallback(callback: (error: Error | null, data?: string) => void) {
    setTimeout(() => {
      callback(null, "コールバックからのデータ");
    }, 500);
  }

  // Promise版
  function fetchDataPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Promiseからのデータ");
      }, 500);
    });
  }

  console.log("【コールバック版】");
  fetchDataCallback((error, data) => {
    if (error) {
      console.log("エラー:", error);
    } else {
      console.log("取得:", data);
    }
  });

  setTimeout(() => {
    console.log("\n【Promise版】");
    fetchDataPromise()
      .then(data => console.log("取得:", data))
      .catch(error => console.log("エラー:", error));
  }, 1000);

  setTimeout(() => {
    console.log("\n【async/await版】");
    (async () => {
      try {
        const data = await fetchDataPromise();
        console.log("取得:", data);
      } catch (error) {
        console.log("エラー:", error);
      }
    })();
  }, 2000);
}, 11000);


// プログラムを終了させるための処理
setTimeout(() => {
  console.log("\n========================================");
  console.log("全ての例が完了しました！");
  console.log("========================================\n");

  console.log("📚 学んだこと:");
  console.log("1. コールバック関数は引数として渡される関数");
  console.log("2. 非同期処理の結果を受け取るために使う");
  console.log("3. error-firstパターンでエラーハンドリング");
  console.log("4. ネストが深くなるとコールバック地獄になる");
  console.log("5. Promise/async-awaitで改善できる");

  process.exit(0);
}, 16000);