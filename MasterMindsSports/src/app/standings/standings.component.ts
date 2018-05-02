import { Router } from '@angular/router';
import { ApicallService } from './../apicall.service';
import { DataShareService } from './../datashare.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css'],
})
export class StandingsComponent implements OnInit {

  suscErrFlag: any;
  standingsList: any;
  data: any;
  id: any;

  constructor(private _api: ApicallService,
    private _router: Router,
    private _ds: DataShareService) { }

  ngOnInit() {
    this._ds.getDataShare.subscribe((data) => {
      this.id = data
    })

    if (this.id) {
      this._api.getStandingsList(this.id).subscribe((data) => {
        this.suscErrFlag = 'SC';
        this.data = data;
        this.standingsList = data.standing;
      }, (error) => {
        this.suscErrFlag = 'ER';
      })
    } else {
      this._router.navigate(['/']);
    }
  }


  team(li) {
    let data ={'id':li.teamId,'nm':li.team}
    this._ds.setDataShare(data);
    this._router.navigate(['/teams']);
  }

}
