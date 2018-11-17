import { DataShareService } from './../datashare.service';
import { ApicallService } from './../apicall.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [ApicallService]
})

export class TeamsComponent implements OnInit, OnDestroy {

  suscErrFlag: any;
  suscErrFlagFX: any;
  fixtures: any;
  playerList: any;
  teamNm: any;
  id: any;
  nofixture: any;
  x: any;

  constructor(private _api: ApicallService,
    private _router: Router,
    private _ds: DataShareService) { }


  ngOnInit() {
    this._ds.getDataShare.subscribe((data) => {
      this.id = data.id;
      this.teamNm = data.nm;
    })

    if (this.id) {
      this._api.getPlayerList(this.id).subscribe((data) => {
        this.suscErrFlag = 'SC';
        this.playerList = data.players;
      }, (error) => {
        this.suscErrFlag = 'ER';
      })

      this._api.getFixtures(this.id, 5).subscribe((data) => {
        this.suscErrFlagFX = 'SC';
        // this.fixtures = data.fixtures;
        this.getUpcomingMatch(data.fixtures);
      }, (error) => {
        this.suscErrFlagFX = 'ER';
      })

    } else {
      this._router.navigate(['/']);
    }
  }

  getUpcomingMatch(fixtures) {
    let d1 = new Date();
    this.nofixture = true;
    for (let i = 0; i < fixtures.length; i++) {
      let d2 = new Date(fixtures[i].date);
      if (d1.getTime() < d2.getTime()) {
        this.nofixture = false;
        this.fixtures = fixtures.slice(i, i + 5);
        for (let j = 0; j < this.fixtures.length; j++) {
          this.fixtures[j].date = new Date(this.fixtures[j].date).toDateString();
          this.countdown(this.fixtures[j].date, j);
        }
        break;
      } 
    }


  }

  countdown(date, i) {
    var countDownDate = new Date(date).getTime();
    
     this.x = setInterval(function () {
      var now = new Date().getTime();
      var time = countDownDate - now;

      var days = Math.floor(time / (1000 * 60 * 60 * 24));
      var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((time % (1000 * 60)) / 1000);

      if (document.getElementById('CD_' + i)) {
        document.getElementById('CD_' + i).innerHTML = days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ";
      }
      if (time < 0) {
        clearInterval(this.x);
        if (document.getElementById('CD_' + i)) {
          document.getElementById('CD_' + i).innerHTML = "EXPIRED";
        }
      }
    }, 1000);
  }

  ngOnDestroy(){
    clearInterval(this.x);
  }

}
