import {styleTags, tags as t} from "@lezer/highlight"

export const fizHighlighting = styleTags({
  Variable: t.variableName,
  Call: t.function(t.variableName),
  LineComment: t.lineComment,
  BlockComment: t.blockComment,
  "( )": t.paren,
  ", ;": t.separator,
})