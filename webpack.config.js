"use strict";

const path = require("path");

module.exports = {
  mode: "development", // could be "production" as well
  entry: "./src/js/script.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },
  watch: true,
  devtool: "source-map",
  module: {},
};
