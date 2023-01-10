import Game from "./game";
import { TeamRepresentation } from "./teamrepresentation";



export default function validateGame(game: Game) {

    var errors: string[] = [];

    errors.push(...validateTeam(game.homeTeam,true));
    errors.push(...validateTeam(game.opponentTeam,false));

    return { isValid: errors.length <= 0, errors: errors }
}


export function validateTeam(team: TeamRepresentation, home: boolean) {

    const errors: string[] = [];

    if (team.aufstellung.player1 === "" || team.aufstellung.player2 === "" || team.aufstellung.player2 === "") {
        errors.push("Es müssen mindestens 3 Spieler pro Aufstellung eingetragen sein!");
    }

    if (team.teamName === '') {
        if (!home)
            errors.push("Es muss ein Name für die gegnerische Mannschaft erfasst sein!");
    }

    return errors;
}