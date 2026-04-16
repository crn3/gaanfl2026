import { Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { ManagersComponent } from './managers/managers.component';
import { TeamsComponent } from './teams/teams.component';
import { ResultsComponent } from './results/results.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TeamRankComponent } from './team-rank/team-rank.component';
import { ScoreStatsComponent } from './score-stats/score-stats.component';
// import { FooterComponent } from './footer/footer.component';

export const routes: Routes = [
    { path: '', component: RoutesComponent, title: "Routes"},
    { path: 'managers', component: ManagersComponent, title: "Managers"},
    { path: 'teams', component: TeamsComponent, title: "Teams"},
    { path: 'results', component: ResultsComponent, title: "Results"},
    { path: 'fixtures', component: FixturesComponent, title: "Fixtures"},
    { path: 'team-rank', component: TeamRankComponent, title: "Team Rank"},
    { path: 'score-stats', component: ScoreStatsComponent, title: "Score Stats"}
];
