import { Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer_message = 'Angular Experiment Summer 2022'; //one-way data binding -> string interpolation in html
  mode: String = 'dark_mode';
  isChecked: boolean = false;
  isCheckedinit: boolean = false;
  isDarkTheme: boolean = false;

  constructor(
    public translate: TranslateService
  ){
    translate.addLangs(['en','fr']);
    translate.setDefaultLang('en');
  }

  switchLanguage(lang: string){
    this.translate.use(lang);
  }

  ngOnInit(): void {
    setTimeout(() => this.isChecked = this.isCheckedinit, 0);
  }

  // //Toggle animation
  // modeToggle(value: MatSlideToggleChange) {
  //     const { checked } = value;
  //     if (checked){
  //       this.mode = 'light_mode';
  //     }
  //     else{
  //       this.mode = 'dark_mode';
  //     }
  // }

//   changeTheme(): void {
//     if (this.isDarkTheme) {
//        document.getElementById('global-theme')!.setAttribute('href', 'styles.css');
//        this.isDarkTheme = false;
//     } else {
//        document.getElementById('global-theme')!.setAttribute('href', 'darkstyles.css');
//        this.isDarkTheme = true;
//     }
//  }

}
