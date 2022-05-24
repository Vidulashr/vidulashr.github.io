import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  @Input() width: number = 0;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=> this.width = 100,100);
  }

}
