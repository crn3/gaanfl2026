import { Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { ManagersComponent } from './managers/managers.component';
import { TeamsComponent } from './teams/teams.component';
import { ResultsComponent } from './results/results.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TeamRankComponent } from './team-rank/team-rank.component';
import { ScoreStatsComponent } from './score-stats/score-stats.component';
import { ScoringStatsComponent } from './scoring-stats/scoring-stats.component';
import { ScoringChartComponent } from './scoring-chart/scoring-chart.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: RoutesComponent, title: 'Routes' },
  { path: 'managers', component: ManagersComponent, title: 'Managers' },
  { path: 'teams', component: TeamsComponent, title: 'Teams' },
  { path: 'results', component: ResultsComponent, title: 'Results' },
  { path: 'fixtures', component: FixturesComponent, title: 'Fixtures' },
  { path: 'team-rank', component: TeamRankComponent, title: 'Team Rank' },
  { path: 'score-stats', component: ScoreStatsComponent, title: 'Score Stats' },
  {
    path: 'scoring-stats',
    component: ScoringStatsComponent,
    title: 'Scoring Stats',
  },
  {
    path: 'scoring-chart',
    component: ScoringChartComponent,
    title: 'Score For/Against',
  },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'admin', component: AdminComponent, title: 'Admin' },
];
