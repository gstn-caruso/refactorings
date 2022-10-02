import generate from "@babel/generator";
import {declareFunctionWithNoParameters, declareFunctionWithParameters} from "../declareFunction";

test("generate method with no parameters", () => {
  const expectedCode = `function greet() {\n  console.log();\n}`
  const newFunction = declareFunctionWithNoParameters("greet")

  const generated = generate(newFunction)
  expect(generated.code).toEqual(expectedCode)
})

test("generates method with a string parameter", () => {
  const expectedCode = `function greet(message: string) {\n  console.log(message);\n}`
  const name = "greet";
  const newFunction = declareFunctionWithParameters(name, [{name: "message", type: "string"}]);

  const generated = generate(newFunction)
  expect(generated.code).toEqual(expectedCode)
})

test("generates method with many string parameters", () => {
  const expectedCode = `function greet(message: string, exclamation: string) {\n  console.log(message, exclamation);\n}`
  const newFunction = declareFunctionWithParameters("greet", [
    {name: "message", type: "string"},
    {name: "exclamation", type: "string"}
  ]);

  const generated = generate(newFunction)
  expect(generated.code).toEqual(expectedCode)
})

test("generates method with many parameters with different types", () => {
  const expectedCode = `function greet(message: string, code: number) {\n  console.log(message, code);\n}`
  const newFunction = declareFunctionWithParameters("greet", [
    {name: "message", type: "string"},
    {name: "code", type: "number"}
  ]);

  const generated = generate(newFunction)
  expect(generated.code).toEqual(expectedCode)
})
