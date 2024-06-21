import { resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";

const mode = process.env.NODE_ENV ?? "development";
const isWatch = process.env.NODE_ENV === "development" ? true : false;

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default {
  mode: mode,
  entry: "./src/main.js",
  output: {
    filename: "main.js",
    path: resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "index.html",
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [],
  },
};
