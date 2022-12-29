import Match from "./match";
import { TeamRepresentation } from "./teamrepresentation";

export default interface Game 
{
    homeTeam: TeamRepresentation,
    opponentTeam: TeamRepresentation,
    doubles: Match[],
    singles:Match[],
    result?:string,
}