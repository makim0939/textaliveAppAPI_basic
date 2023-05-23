const path = require('path');
module.exports = {
  entry: './src/index.ts',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // import文でファイル拡張子を書かずに名前解決するための設定
  // 例...「import World from './world'」と記述すると"world.ts"という名前のファイルをモジュールとして探す
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    }, // webpack-dev-serverの公開フォルダ
    open: true // サーバー起動時にブラウザを開く
  },
  // モジュールに適用するルールの設定（ローダーの設定を行う事が多い）
  module: {
    rules: [
      {
        // 拡張子が.tsのファイルに対してTypeScriptコンパイラを適用する
        // Reactで用いる.tsxの拡張子にも適用する場合は test:/\.(ts|tsx)$/,
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  }
};
