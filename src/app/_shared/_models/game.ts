import { UserGame } from './userGame';

export class Game {
    identifier: string;
    name: string;
    description: string;
    image: string;
    userGameStates: UserGame[];

    public constructor(init?:Partial<Game>) {
        Object.assign(this, init);
    }
}