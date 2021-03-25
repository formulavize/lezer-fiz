import { ExternalTokenizer } from "lezer"
import { omitSemi } from "./parser.terms.js"

const newline = [10, 13, 8232, 8233]
const space = [9, 11, 12, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288]
const braceR = 125

function newlineBefore(input, pos) {
  for (let i = pos - 1; i >= 0; i--) {
    let prev = input.get(i)
    if (newline.indexOf(prev) > -1) return true
    if (space.indexOf(prev) < 0) break
  }
  return false
}

export const omitSemicolon = new ExternalTokenizer((input, token, stack) => {
  let pos = token.start, next = input.get(pos)
  if ((next == braceR || next == -1 || newlineBefore(input, pos)) && stack.canShift(omitSemi))
    token.accept(omitSemi, token.start)
}, {contextual: true, fallback: true})
