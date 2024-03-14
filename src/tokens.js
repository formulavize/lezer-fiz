import { ExternalTokenizer, ContextTracker } from "@lezer/lr";
import {
  insertSemi,
  spaces,
  newline,
  LineComment,
  BlockComment,
  Unit,
  cssIdentifier,
} from "./parser.terms.js";

const space = [
  9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197,
  8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288,
];

const percent = 37,
  dash = 45,
  underscore = 95,
  braceR = 125;

function isAlpha(ch) {
  return (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122) || ch >= 161;
}

function isDigit(ch) {
  return ch >= 48 && ch <= 57;
}

export const trackNewline = new ContextTracker({
  start: false,
  shift(context, term) {
    return term == LineComment || term == BlockComment || term == spaces
      ? context
      : term == newline;
  },
  strict: false,
});

export const insertSemicolon = new ExternalTokenizer(
  (input, stack) => {
    let { next } = input;
    if (
      (next == braceR || next == -1 || stack.context) &&
      stack.canShift(insertSemi)
    )
      input.acceptToken(insertSemi);
  },
  { contextual: true, fallback: true },
);

export const unitToken = new ExternalTokenizer((input) => {
  if (!space.includes(input.peek(-1))) {
    let { next } = input;
    if (next == percent) {
      input.advance();
      input.acceptToken(Unit);
    }
    if (isAlpha(next)) {
      do {
        input.advance();
      } while (isAlpha(input.next));
      input.acceptToken(Unit);
    }
  }
});

export const cssIdentifierToken = new ExternalTokenizer((input) => {
  for (let inside = false, dashes = 0, i = 0; ; i++) {
    let { next } = input;
    if (
      isAlpha(next) ||
      next == dash ||
      next == underscore ||
      (inside && isDigit(next))
    ) {
      if (!inside && (next != dash || i > 0)) inside = true;
      if (dashes === i && next == dash) dashes++;
      input.advance();
    } else {
      if (inside) input.acceptToken(cssIdentifier);
      break;
    }
  }
});
