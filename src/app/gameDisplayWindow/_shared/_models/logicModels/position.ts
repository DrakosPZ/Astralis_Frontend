export class Position {
    x: number;
    y: number;

    public constructor(init?:Partial<Position>) {
        Object.assign(this, init);
    }
}