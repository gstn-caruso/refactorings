import {functionDeclaration, Identifier} from "@babel/types"
import generate from "@babel/generator";

test("generate method with no parameters", () => {
  const expectedCode = `function greet() {\n  console.log();\n}`
  const newFunction = declareFunctionWithNoParameters("greet")

  const generated = generate(newFunction)
  expect(generated.code).toEqual(expectedCode)
})

test("generates method with a string parameter", () => {
  const expectedCode = `function greet(message: string) {\n  console.log(message);\n}`
  const parameters = ["message"];
  const name = "greet";
  const newFunction = declareFunctionWithParameters(name, parameters);

  const generated = generate(newFunction)
  expect(generated.code).toEqual(expectedCode)
})

test("generates method with many string parameters", () => {
  const expectedCode = `function greet(message: string, exclamation: string) {\n  console.log(message, exclamation);\n}`
  const newFunction = declareFunctionWithParameters("greet", ["message", "exclamation"]);

  const generated = generate(newFunction)
  expect(generated.code).toEqual(expectedCode)
})

const declareFunctionWithNoParameters = (message: string) => declareFunction(message, []);
const declareFunctionWithParameters = (name: string, parameters: string[]) => declareFunction(name, parameters);

function declareFunction(name: string, parameters: string[]) {
  const id: (idName: string) => Identifier = (idName: string) => ({type: "Identifier", name: idName});

  const params: Identifier[] = parameters.map((p) => ({
    ...id(p),
    typeAnnotation: {
      type: "TSTypeAnnotation",
      typeAnnotation: {
        type: "TSStringKeyword"
      }
    }
  }))


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
