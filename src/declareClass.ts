import {ClassBody, classDeclaration, Expression, Identifier} from "@babel/types";

export function declareClass(className: string, superClass?: Expression) {
    const id: Identifier = {name: className, type: "Identifier"};
    const body: ClassBody = {body: [], type: "ClassBody"};

    return classDeclaration(id, superClass, body);
}