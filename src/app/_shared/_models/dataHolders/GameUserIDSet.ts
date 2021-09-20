import { Game } from '../game';

export class GameUserIDSet {
    gameLobby: Game;
    userIdentifier: string;

    public constructor(init?:Partial<GameUserIDSet>) {
        Object.assign(this, init);
    }
}