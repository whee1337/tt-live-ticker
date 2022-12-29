
export default interface Set {
    homeScore: number,
    opponentScore: number
}

export default interface Match{
    playerHome:string,
    opponent: string,
    sets: Set[],
    result?:number,
}