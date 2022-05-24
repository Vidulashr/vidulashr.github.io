import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() height: number = 100;
  @Input() width: number = 0;
  @Input() opacity: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.height = 0,100);
    setTimeout(()=> this.width = 100,10);
    setTimeout(()=> this.opacity = 100,100);
  }

}
