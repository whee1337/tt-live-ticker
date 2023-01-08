import Game from "~/models/game";
import { getStoredGames } from "./games";


export async function getGameById(id:number){
    const games: Game[] = await getStoredGames();
    return games ? games.find(game => game.id === id):undefined;  
}