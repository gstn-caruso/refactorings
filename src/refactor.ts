import {parse} from "@babel/parser";

export function refactor(code: string) {
  const parsed = parse(code)
  return code
}