export interface Team {
    id: number,
    name: string,
    rgb: number[],
    r: number,
    g: number,
    b: number,
    latitude: string,
    longitude: number,
    powerrank: number

}

export interface TeamWithStats extends Team{
    division: number | 'all';
    totalMatches: number;
    totalScore: number;
    goals: number;
    twoPts: number;
    onePts: number;
}
