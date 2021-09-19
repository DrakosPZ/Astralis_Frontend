import { LogicGameState } from "../../logicGameState";
import { SpecializedMessage } from "./specializedMessage";

export class GameStateUpdate implements SpecializedMessage{

    logicGameState: LogicGameState;

    public constructor(init?:Partial<GameStateUpdate>) {
        Object.assign(this, init);
    }

}