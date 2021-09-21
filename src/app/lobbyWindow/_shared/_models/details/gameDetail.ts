import { UserGameDetail } from './userGameDetail';
import { GameStatus } from '../../../../_shared/_models/gameStatus';

export class GameDetail {
    identifier: string;
    name: string;
    description: string;
    image: string;
    status: GameStatus;
    userGameLobbies: UserGameDetail[];

    public constructor(init?:Partial<GameDetail>) {
        Object.assign(this, init);
    }
}