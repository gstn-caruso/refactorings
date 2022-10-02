import {Identifier} from "@babel/types";
import {declareClass} from "./declareClass";

export function declareSubClass(subClassName: string, superClass: string) {
    const superClassId: Identifier = {name: superClass, type: "Identifier"}
    return declareClass(subClassName, superClassId)
}