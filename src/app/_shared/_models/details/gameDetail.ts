import { UserGameDetail } from './userGameDetail';
import { GameStatus } from '../gameStatus';

export class GameDetail {
    identifier: string;
    name: string;
    description: string;
    image: string;
    status: GameStatus;
    userGameStates: UserGameDetail[];

    public constructor(init?:Partial<GameDetail>) {
        Object.assign(this, init);
    }
}