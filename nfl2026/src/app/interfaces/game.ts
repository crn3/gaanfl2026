export interface Game { //rename Game. use for both results and fixtures
    id: number,
    division: number,
    round: number,
    hteam: string,
    hteamscore: string,
    ateamscore: string,
    ateam: string,
    hgls: number,
    h2pts: number,
    h1pts: number,
    hteamtotal: number, 
    agls: number,
    a2pts: number,
    a1pts: number,
    ateamtotal: number
}

export interface GameWithColour extends Game {
    homeR: number,
    homeG: number,
    homeB: number,
    awayR: number,
    awayG: number,
    awayB: number
}