import {compact} from "../compact";

test("a text with no spaces remains the same", ()=> {
    expect(compact("hi")).toEqual("hi")
})

test("a text with spaces in the end is equal to the same text without spaces", ()=>{
    expect(compact("hi ")).toEqual("hi")
})

test("a text surrounded by spaces is equal to the same text without spaces", ()=> {
    expect(compact(" hi ")).toEqual("hi")
})

test("a text surrounded by spaces is equal to the same text without spaces", ()=> {
    expect(compact(" hi ")).toEqual("hi")
})

test("a text with a space in the middle is equal to the same text without spaces", ()=> {
    expect(compact("h i")).toEqual("hi")
})

test("a text with more than one space in the middle is equal to the same text without spaces", ()=> {
    expect(compact("h  i")).toEqual("hi")
})

test("a text with a break line is equal to the same text without spaces", ()=> {
    expect(compact("h\ni")).toEqual("hi")
})

test("a text with a tab is equal to the same text without spaces", ()=> {
    expect(compact("h\ti")).toEqual("hi")
})

