import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  @Input() width: number = 95;
  @Input() opacity: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.opacity = 100,100);
  }

}
