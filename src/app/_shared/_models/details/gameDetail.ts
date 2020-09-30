import { UserGameDetail } from './userGameDetail';

export class GameDetail {
    identifier: string;
    name: string;
    description: string;
    image: string;
    userGameStates: UserGameDetail[];

    public constructor(init?:Partial<GameDetail>) {
        Object.assign(this, init);
    }
}