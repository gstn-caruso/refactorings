import {BlockStatement, CallExpression, ExpressionStatement, functionDeclaration} from "@babel/types"
import generate from "@babel/generator";

test("generate method", () => {
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