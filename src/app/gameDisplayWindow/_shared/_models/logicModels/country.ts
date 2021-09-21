import { Ship } from "./ship";

export class Country {
    id: number;
    name: string;
    colour: string;

    ship: Ship;
    owner: string;

    public constructor(init?:Partial<Country>) {
        Object.assign(this, init);
    }
}