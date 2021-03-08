import { GameDetail } from './details/gameDetail';
import { UserGame } from './userGame';
import { GameStatus } from './gameStatus';

export class Game {
    identifier: string;
    name: string;
    description: string;
    image: string;
    status: GameStatus;
    userGameStates: UserGame[];

    public constructor(init?:Partial<Game>) {
        Object.assign(this, init);
    }
}

export function turnDetailIntoSimple(detail: GameDetail): Game{
    return new Game({
        identifier: detail.identifier,
        name: detail.name,
        description: detail.description,
        image: detail.image,
        status: detail.status
    });
}

export function findInArray(find: Game, inArray: Game[]): number{
    let index = -1;
    inArray.forEach(game => {
        if(index != -1 && game.identifier === find.identifier){
            index = inArray.indexOf(game);
        }
    });
    return index;
}