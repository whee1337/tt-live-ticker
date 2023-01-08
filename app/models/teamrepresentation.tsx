
export enum TeamType {
    Damen ="Damen",
    Herren = "Herren",
    Jugend = "Jugend"
}

export interface Aufstellung 
{
    player1: string,
    player2: string,
    player3: string,
    player4: string, 
    player5?: string,
    player6?: string
}

export interface TeamRepresentation {
    teamName: string,
    aufstellung: Aufstellung,
    teamNumber?: number
}