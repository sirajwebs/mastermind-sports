import { DataShareService } from './datashare.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataShareService]
})
export class AppComponent {
  title = 'element.s';
}
