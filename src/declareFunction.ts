import {functionDeclaration, Identifier, TSTypeAnnotation} from "@babel/types";

export type Id = { name: string, type: string };
export const declareFunctionWithNoParameters = (message: string) => declareFunction(message, []);
export const declareFunctionWithParameters = (name: string, parameters: Id[]) => declareFunction(name, parameters);


export function declareFunction(name: string, parameters: Id[]) {
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