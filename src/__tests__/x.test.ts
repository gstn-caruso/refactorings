import {BlockStatement, CallExpression, ExpressionStatement, functionDeclaration} from "@babel/types"
import generate from "@babel/generator";

test("generate method with no parameters", () => {
  const expectedCode = `function greet() {\n  console.log("hello!");\n}`

  const body: CallExpression = {
    type: "CallExpression",
    arguments: [{
      type: "StringLiteral",
      value: "hello!"
    }],
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
  };

  const bodyStatement: ExpressionStatement = {type: "ExpressionStatement", expression: body};
  const statement: BlockStatement = {body: [bodyStatement], directives: [], type: "BlockStatement"}
  const newFunction = functionDeclaration({type: "Identifier", name: "greet"}, [], statement);

  const generated = generate(newFunction)

  expect(generated.code).toEqual(expectedCode)
})

test("generates method with a string parameter", () => {
  const expectedCode = `function greet(message: string) {\n  console.log(message);\n}`

  const body: CallExpression = {
    type: "CallExpression",
    arguments: [{
      type: "Identifier",
      name: "message",
    }],
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
  };

  const bodyStatement: ExpressionStatement = {type: "ExpressionStatement", expression: body};
  const statement: BlockStatement = {body: [bodyStatement], directives: [], type: "BlockStatement"}
  const newFunction = functionDeclaration({type: "Identifier", name: "greet"}, [{
    type: "Identifier",
    name: "message",
    typeAnnotation: {
      type: "TSTypeAnnotation",
      typeAnnotation: {
        type: "TSStringKeyword"
      }
    }
  }], statement);

  const generated = generate(newFunction)

  expect(generated.code).toEqual(expectedCode)
})