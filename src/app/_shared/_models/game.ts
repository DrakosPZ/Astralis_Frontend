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

export function findInArray(find: Game, inArray: Game[]): number{
    let index = -1;
    inArray.forEach(game => {
        if(index != -1 && game.identifier === find.identifier){
            index = inArray.indexOf(game);
        }
    });
    return index;
}