import Match from "./match";
import { TeamRepresentation, TeamType } from "./teamrepresentation";


export enum GameState {
    pending,
    live,
    finished
}
export default interface Game 
{
    id: number,
    homeTeam: TeamRepresentation,
    opponentTeam: TeamRepresentation,
    type: TeamType,
    doubles?: Match[],
    singles?:Match[],
    result?:string,
    state: GameState
}