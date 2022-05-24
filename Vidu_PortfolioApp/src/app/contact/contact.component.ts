import { Component,Input, OnInit,ViewChild,ElementRef } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('name', { static: true }) nameElement: ElementRef;

  email = new FormControl('',[Validators.required, Validators.email]); //property binding
  name = new FormControl('',[Validators.required]); //property binding
  sendername: string= "";

  @Input() opacity: number = 0;

  constructor(nameElement: ElementRef) {
    this.nameElement = nameElement;
  }

  ngOnInit(): void {
    setTimeout(()=> this.opacity = 100,100);
  }

  getErrorMessage() {
       if (this.email.hasError('required')) {
         return 'You must enter a value';}
       return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getNameErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';}
      return 'You must enter a value';
    }

  
  //one-way data binding -> event binding shown in html
  sendMessage(){ 
      if (((<HTMLInputElement>document.getElementById("name")).value.trim().length==0)||((<HTMLInputElement>document.getElementById("email")).value.trim().length==0)){
        (<HTMLInputElement>document.getElementById("contact-error")).style.visibility = 'visible';
        (<HTMLInputElement>document.getElementById("contact-send")).style.visibility = 'hidden';
        (<HTMLInputElement>document.getElementById("send-button")).innerHTML = 'SEND';
        return;
      }

      if ((<HTMLInputElement>document.getElementById("name")).value.trim().length>0){
        this.sendername = (<HTMLInputElement>document.getElementById("name")).value;
        (<HTMLInputElement>document.getElementById("contact-send")).style.visibility = 'visible';
        (<HTMLInputElement>document.getElementById("contact-error")).style.visibility = 'hidden';
        (<HTMLInputElement>document.getElementById("send-button")).innerHTML = 'SENT';
        return;
        }
      } 
}
