---
title: Azure Static Web Apps へデプロイするには?
description: Azure Static Web Apps へ Nuxt.js アプリケーションをデプロイするには?
menu: Deploy on Azure Static Web Apps
category: deployment
position: 203
---

Azure Static Web Apps を使って静的サイトを Azure にデプロイすることができます。Azure Static Web Apps は、git push のたびに静的なサイトを再構築できる GitHub Actions を利用しているので、GitHub でウェブアプリケーションを作成する必要があります。

Azure Static Web Apps にデプロイするために必要な設定が 2 つあります。1 つ目は、Azure が package.json から build コマンドを読み取るので、build コマンドを用意することです。静的サイトの場合は generate コマンドを使用する必要があります。

`package.json`

```json
build: "nuxt generate"
```

2 つ目は、カスタム 404 ページや SPA フォールバックページをキャッチするために重要な routes.json ファイルを追加することです。

`static/routes.json`

```jsx
{
 "routes": [],
 "platformErrorOverrides": [
   {
    "errorType": "NotFound",
    "serve": "/200.html",
    "statusCode": 200
   }
 ]
}
```

Azure Static Web Apps へのデプロイをテストするために、すべてのセットアップと設定が完了した小さなデモアプリケーションを作成しました。クローンして GitHub のリポジトリに追加するだけです。その後、次の手順（Azure Static Web Apps にアプリケーションをデプロイ）に従ってください。

[デモアプリケーションをクローンしてください](https://github.com/debs-obrien/nuxtjs-azure-static-app)

## Azure Static Web Apps にアプリケーションをデプロイ

### ステップ 1: **Azure Static Web Apps を作成**

1. [Azure Portal](https://portal.azure.com/) へ遷移します。
2. **Create a Resource**  をクリックし、**Static App** を探して選択してください。
3. _Subscription_ のドロップダウンリストからサブスクリプションを選択するか、デフォルトのサブスクリプションを使用します。
4. _Resource Group_ のドロップダウンの下にある **Create new** リンクをクリックします。_Name_ に **nuxt** と入力し、**OK** をクリックします。
5. **Name** のテキストボックスにグローバルユニークなアプリケーションの名前を入力します。有効な文字は、`a-z`、`A-Z`、`0-9`、および `-` です。アプリケーションの名前は、リソースリストでアプリケーションを識別するために使用されるため、リポジトリ名を使って名付けることをお勧めします。
6. *Region*  のドロップダウンは、近くの地域を選んでください。

![Azure Portal のリソースとアプリケーションのセットアップ](https://user-images.githubusercontent.com/13063165/82118135-71891b00-9775-11ea-8284-aa94d17a3bc3.png)

### ステップ 2: **GitHub リポジトリを追加**

Azure App Service の Static App は、コミットを自動的にデプロイできるように、Nuxt.js アプリケーションがあるリポジトリにアクセスする必要があります:

1. **Sign in with GitHub ボタン** をクリックします。
2. Nuxt.js プロジェクトのリポジトリを作成した **Organization** を選択します。GitHub のユーザー名を指定することもできます。
3. 作成したリポジトリの名前を探して選択します。
4. *Branch*  のドロップダウンから **master** ブランチを選択します。

![GitHub を追加する方法](https://user-images.githubusercontent.com/13063165/82118359-38ea4100-9777-11ea-9c5e-7ba5c4da708e.png)

### ステップ 3: **ビルドプロセスの設定**

Azure App Service の Static App が想定できることはいくつかあります。npm モジュールを自動的にインストールしたり、`npm run build` を実行したりします。また、ビルド後の静的アプリケーションは、どのフォルダにコピーするかなど、明示しなければならないこともいくつかあります。

1. **Build** タブをクリックして、静的アプリケーションの出力フォルダを設定します。
2. _App artifact location_ のテキストボックスに **dist** と入力します。

![Azure portal のビルド設定](https://user-images.githubusercontent.com/13063165/82118277-71d5e600-9776-11ea-88ad-48cf0793905d.png)

### ステップ 4: **確認と作成**

1. **Review + Create** ボタンをクリックして、詳細がすべて正しいことを確認します。
2. **Create**  をクリックすると、リソースの作成が開始され、デプロイ用の GitHub Action も提供されます。
3. デプロイが完了したら、**Go to resource** をクリックします。

![Azure portal のデプロイ完了メッセージ](https://user-images.githubusercontent.com/13063165/82118390-67681c00-9777-11ea-9778-671dc768393e.png)

4. リソース画面で、_URL_ リンクをクリックして、デプロイしたアプリケーションを開きます。

![デプロイされたアプリケーションのURLを含むリソース画面](https://user-images.githubusercontent.com/13063165/82118042-d001c980-9774-11ea-94f5-57d995aa5391.png)

おめでとうございます。静的サイトが Azure Static Web Apps にホストされました。

## 静的アプリケーションの再構築とデプロイの監視

あとはコードを修正して、変更をプッシュするだけです。変更をプッシュすると GitHub Action が起動し、新しいサイトが自動的に再構築されます。GitHub リポジトリの Actions タブをクリックすることでワークフローを監視することができ、最後に行ったコミットを選択することでさらに調査することができます。デプロイが終了したかどうかを確認したり、デプロイエラーが発生した場合はログを調査したりすることができます。

![GitHub Actions の画面](https://user-images.githubusercontent.com/13063165/82118249-34715880-9776-11ea-92e2-dbd21bbf7cb6.png)

## 補足説明

### **動的なルーティングを扱う方法**

\_id.vue のような動的なページを扱う場合は、これらのルートを nuxt.config.js の generate プロパティに追加する必要があります。

[動的なルーティングを扱う方法のドキュメントを参照してください。](/docs/2.x/configuration-glossary#routes)

<div class="Alert">
Nuxt 2.13+ を使用しているのであれば、すべての動的ページをサイトリンクからクロールするクローラーが組み込まれているので、このことを心配する必要はありません。
</div>

### エラーページを追加する方法

デフォルトの 404 ページを持たないようにするには、layouts フォルダに `error.vue` ファイルを作成します。

### SPA フォールバックを追加する方法

いくつかのページを生成せずにシングルページアプリケーションとして動作させたい場合は、nuxt.config ファイルの中の generate.excludes プロパティを使用して、可能になります。

[SPA フォールバックに関するドキュメントを参照してください。](/docs/2.x/configuration-glossary#exclude)
