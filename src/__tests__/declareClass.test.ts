import generate from "@babel/generator";
import {declareClass} from "../declareClass";
import {declareSubClass} from "../declareSubClass";

describe("declareClass", () => {


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