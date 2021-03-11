import { GameStatus } from "src/app/_shared/_models/gameStatus";
import { Country } from "./country";

export class LogicGameState {
    id: number;
    gameStatus: GameStatus;
    year: number;
    month: number;
    day: number;
    hour: number;

    countries: Country[];

    public constructor(init?:Partial<LogicGameState>) {
        Object.assign(this, init);
    }
}