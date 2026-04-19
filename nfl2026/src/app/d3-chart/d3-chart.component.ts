import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { TeamForAgainst } from '../interfaces/team-for-against';

@Component({
  selector: 'app-d3-chart',
  standalone: true,
  template: `<figure id="bar"></figure>`,
  styleUrl: './d3-chart.component.css',
})
export class D3ChartComponent implements OnInit, OnChanges {
  @Input() teamForAgainst: TeamForAgainst[] = [];

  private svg: any;
  private width = 1200;
  private height = 400;

  ngOnInit(): void {
    this.createSvg();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teamForAgainst'] && this.svg) {
      this.svg.selectAll('*').remove();
      this.drawChart(this.teamForAgainst);
    }
  }

  private createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');
  }

  private drawChart(data: TeamForAgainst[]): void {
    const midLine = this.height / 2;

    const x = d3
      .scaleBand()
      .range([0, this.width])
      .domain(data.map((d) => d.name))
      .padding(0.2);

    const maxValue =
      d3.max(data, (d) => Math.max(d.scoresFor, d.scoresAgainst)) || 0;

    const y = d3
      .scaleLinear()
      .domain([0, maxValue])
      .range([0, midLine - 40]);

    // for bars
    this.svg
      .selectAll('.bar-for')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-for')
      .attr('x', (d: TeamForAgainst) => x(d.name))
      .attr('y', (d: TeamForAgainst) => midLine - y(d.scoresFor))
      .attr('width', x.bandwidth())
      .attr('height', (d: TeamForAgainst) => y(d.scoresFor))
      .attr('fill', 'steelblue');

    // against bars
    this.svg
      .selectAll('.bar-against')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar-against')
      .attr('x', (d: TeamForAgainst) => x(d.name))
      .attr('y', midLine)
      .attr('width', x.bandwidth())
      .attr('height', (d: TeamForAgainst) => y(d.scoresAgainst))
      .attr('fill', 'darkred');

    // shortname in middle
    this.svg
      .selectAll('.team-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'team-label')
      .attr('x', (d: TeamForAgainst) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', midLine - 6)
      .attr('text-anchor', 'middle')
      .text((d: TeamForAgainst) => d.shortName)
      .style('fill', 'white')
      .style('font-size', '12px');

    // numbers above
    this.svg
      .selectAll('.for-value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'for-value')
      .attr('x', (d: TeamForAgainst) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', (d: TeamForAgainst) => midLine - y(d.scoresFor) - 5)
      .attr('text-anchor', 'middle')
      .text((d: TeamForAgainst) => d.scoresFor)
      .style('font-size', '12px');

    // numbers below
    this.svg
      .selectAll('.against-value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'against-value')
      .attr('x', (d: TeamForAgainst) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', (d: TeamForAgainst) => midLine + y(d.scoresAgainst) + 15)
      .attr('text-anchor', 'middle')
      .text((d: TeamForAgainst) => d.scoresAgainst)
      .style('font-size', '12px');
  }
}
