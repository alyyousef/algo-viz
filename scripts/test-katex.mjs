import katex from 'katex'

try {
  const result = katex.renderToString('\\frac\\lbrace A \\rbrace\\lbrace B \\rbrace')
  console.log("SUCCESS!")
  console.log(result)
} catch (e) {
  console.log("ERROR:")
  console.log(e.message)
}
