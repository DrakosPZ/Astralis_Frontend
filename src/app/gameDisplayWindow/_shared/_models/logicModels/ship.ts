import { Position } from "./position";

export class Ship {
    id: number;
    targetPosition: Position;
    currentPosition: Position;

    movementSpeed: number;

    public constructor(init?:Partial<Ship>) {
        Object.assign(this, init);
    }
}