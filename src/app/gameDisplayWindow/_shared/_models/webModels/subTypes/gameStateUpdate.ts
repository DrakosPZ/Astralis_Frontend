import { GameState } from "../../logicModels/gameState";
import { SpecializedMessage } from "./specializedMessage";

export class GameStateUpdate implements SpecializedMessage{

    gameState: GameState;

    public constructor(init?:Partial<GameStateUpdate>) {
        Object.assign(this, init);
    }

}