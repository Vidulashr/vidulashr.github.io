import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @Input() width: number = 0;
  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.width = 100,100);
  }

}
