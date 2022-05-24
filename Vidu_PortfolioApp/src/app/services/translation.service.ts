
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslationService {

  data: any = {};

  constructor(private http: HttpClient) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>(resolve => {
      const langPath = `assets/languages/en.json`;

      this.http.get(langPath).subscribe(
        response => {
          this.data = response || {};
          resolve(this.data);
        },
        err => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}