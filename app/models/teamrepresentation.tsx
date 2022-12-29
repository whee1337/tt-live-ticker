
export enum TeamType {
    Damen,
    Herren,
    Jugend
}
export interface Aufstellung 
{
    player1: string,
    player2: string,
    player3:string,
    player4:string, 
    player5?:string,
    player6?:string
}

export interface TeamRepresentation {
    type: TeamType,
    teamNumber: number,
    aufstellung: Aufstellung
}