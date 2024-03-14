import { lezer } from "@lezer/generator/rollup"

export default {
  input: "./src/parser.js",
  output: [{
    format: "cjs",
    file: "./dist/index.cjs"
  }, {
    format: "es",
    file: "./dist/index.es.js"
  }],
  external(id) {
    return !/^[\.\/]/.test(id)
  },
  plugins: [
    lezer()
  ]
}
