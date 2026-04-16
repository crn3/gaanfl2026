import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [],
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent {

  textarea: string = '';

  constructor(private http: HttpClient) {}

  handleUpdateTextArea(url: string){
    this.textarea='';

    this.http.get(url).subscribe({
      next: (response) => {
        this.textarea = JSON.stringify(response, null, 2);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
