import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Input() height: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.height = 100,100);
  }

}
