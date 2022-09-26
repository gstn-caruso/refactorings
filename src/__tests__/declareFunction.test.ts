import {functionDeclaration, Identifier, TSTypeAnnotation} from "@babel/types"
import generate from "@babel/generator";

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

type Id = { name: string, type: string };
const declareFunctionWithNoParameters = (message: string) => declareFunction(message, []);
const declareFunctionWithParameters = (name: string, parameters: Id[]) => declareFunction(name, parameters);

function declareFunction(name: string, parameters: Id[]) {
  const id: (parameter: string) => Identifier = (x) => ({type: "Identifier", name: x});

  const params: Identifier[] = parameters.map((p) => {
    const idType = p.type === "string" ? "TSStringKeyword" : "TSNumberKeyword"

    return ({
      ...id(p.name),
      typeAnnotation: {
        type: "TSTypeAnnotation",
        typeAnnotation: {
          type: idType as unknown as TSTypeAnnotation,
        },
      }
    } as unknown as Identifier);
  })


  return functionDeclaration(id(name), params, {
    body: [{
      type: "ExpressionStatement", expression: {
        type: "CallExpression",
        arguments: params,
        callee: {
          type: "MemberExpression",
          object: {
            type: "Identifier",
            name: "console"
          },
          property: {
            type: "Identifier",
            name: "log"
          },
          computed: false,
        },
      }
    }], directives: [], type: "BlockStatement"
  });
}
