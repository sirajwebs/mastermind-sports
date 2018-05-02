import { DataShareService } from './../datashare.service';
import { ApicallService } from './../apicall.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApicallService]
})

export class HomeComponent implements OnInit {

  suscErrFlag: any;
  // standingsList: any;
  compList: any;

  constructor(private _api: ApicallService,
    private _router: Router,
    private _ds: DataShareService) { }

  ngOnInit() {
    this._api.getCompetitionList().subscribe((data) => {
      this.suscErrFlag = 'SC';
      this.compList = data;
      // console.log(data);
    }, (error) => {
      this.suscErrFlag = 'ER';
    })
  }

  /*   menu(flag) {
      if (flag === 'te') {
        this._router.navigate(['/teams']);
      } else if (flag === 'co') {
        this._router.navigate(['/competition']);
      } else if (flag === 'st') {
        this._router.navigate(['/standings']);
      }
    } */

  compMenu(id) {

    this._ds.setDataShare(id);
    this._router.navigate(['/standings']);

    // this._api.getStandingsList(id).subscribe((data) => {
    //   this.suscErrFlag = 'SC';
    //   this.standingsList = data;
    //   console.log(data);
    // }, (error) => {
    //   this.suscErrFlag = 'ER';
    // })
  }

}
