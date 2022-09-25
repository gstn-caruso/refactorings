import {refactor} from "../refactor";

test("x", ()=> {
  const code = `
    console.log("hello!");
  `

  const expectedCode = `
    function greet() {
      console.log("hello!");
    }
    
    greet();
  `

    const refactoredCode = refactor(code)

    expect(refactoredCode).toEqual(expectedCode)
})