const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/main.tsx",
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cotasFrontend",
      filename: "remoteEntry.js",
      exposes: {
        "./CotasApp": "./src/App",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.0.0" },
      },
    }),
  ],
};
