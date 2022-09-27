import {ClassBody, classDeclaration, Expression, Identifier} from "@babel/types";
import generate from "@babel/generator";

describe("declareClass", () => {
  function declareClass(className: string, superClass?: Expression) {
    const id: Identifier = {name: className, type: "Identifier"};
    const body: ClassBody = {body: [], type: "ClassBody"};

    return classDeclaration(id, superClass, body);
  }

  function declareSubClass(subClassName: string, superClass: string) {
    const ex: Identifier = {name: superClass, type: "Identifier"}
    return declareClass(subClassName, ex)
  }

  test("generates a class with a given name", () => {
    const expectedCode = `class ClassName {}`;

    const newClass = declareClass("ClassName");

    const generated = generate(newClass)
    expect(generated.code).toEqual(expectedCode)
  })

  test("generates a subclass from a given class name", () => {
    const expectedCode = `class SubClassName extends SuperClass {}`;

    const newClass = declareSubClass("SubClassName", "SuperClass");

    const generated = generate(newClass)
    expect(generated.code).toEqual(expectedCode)
  })
})