import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-division-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './division-filter.component.html',
  styleUrl: './division-filter.component.css'
})
export class DivisionFilterComponent {
  @Input()
  filterControl!: FormControl;

}
