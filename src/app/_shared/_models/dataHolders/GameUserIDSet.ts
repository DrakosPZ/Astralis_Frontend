import { Game } from '../game';

export class GameUserIDSet {
    gameState: Game;
    userIdentifier: string;

    public constructor(init?:Partial<GameUserIDSet>) {
        Object.assign(this, init);
    }
}