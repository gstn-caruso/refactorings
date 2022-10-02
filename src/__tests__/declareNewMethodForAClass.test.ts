import generate from "@babel/generator";
import {declareClass} from "../declareClass";
import {declareFunctionWithNoParameters} from "../declareFunction";
import {ClassDeclaration, ClassMethod, FunctionDeclaration} from "@babel/types";
import {compact} from "../compact";

function declareMessage(classDeclaration: ClassDeclaration, functionDeclaration: FunctionDeclaration): ClassDeclaration {
    const classMethod: ClassMethod = {
        async: false,
        computed: false,
        generator: false,
        kind: "method",
        params: [],
        static: false,
        type: "ClassMethod",
        key: {type: "Identifier", name: "greet"},
        body: functionDeclaration.body
    }

    classDeclaration.body.body.push(classMethod)

    return classDeclaration
}

test("given a class it defines a method for it with no parameters", () => {
    const expectedCode = `
    class NewClass {
        greet() {
            console.log();
        }
    }`;

    const newClass = declareClass("NewClass")
    const greeting = declareFunctionWithNoParameters("greet")
    const newClassWithGreetingMethod = declareMessage(newClass, greeting)
    const generated = generate(newClassWithGreetingMethod)

    expect(compact(generated.code)).toEqual(compact(expectedCode))
})
