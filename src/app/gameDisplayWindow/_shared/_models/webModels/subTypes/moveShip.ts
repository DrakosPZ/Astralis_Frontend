import { Position } from "../../logicModels/position";
import { SpecializedMessage } from "./specializedMessage";

export class Moveship implements SpecializedMessage{
    shipId: number;
    newGoal: Position;

    public constructor(init?:Partial<Moveship>) {
        Object.assign(this, init);
    }
}