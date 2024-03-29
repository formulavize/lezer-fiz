import { styleTags, tags as t } from "@lezer/highlight";

export const fizHighlighting = styleTags({
  Variable: t.variableName,
  Call: t.function(t.variableName),
  LineComment: t.lineComment,
  BlockComment: t.blockComment,
  PropertyName: t.propertyName,
  NumberLiteral: t.number,
  StringLiteral: t.string,
  ColorLiteral: t.color,
  Unit: t.unit,
  StyleTag: t.tagName,
  Namespace: t.namespace,
  "( )": t.paren,
  "{ }": t.brace,
  "[ ]": t.squareBracket,
  ":": t.punctuation,
  ", ;": t.separator,
  ".": t.derefOperator,
});
