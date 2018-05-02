import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApicallService {

  constructor(private _http: Http) { }

  getCompetitionList(): Observable<any> {

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Response-Control': 'minified',
      'X-Auth-Token': '5d07c802527043949ca85d47ec98090a'
    });
    const options = new RequestOptions({ headers: headers });

    return this._http.get('http://api.football-data.org/v1/competitions/', options)
      .map(this.extractData).catch(this.errorHandle);
  }

  getStandingsList(compId): Observable<any> {

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Response-Control': 'minified',
      'X-Auth-Token': '5d07c802527043949ca85d47ec98090a'
    });
    const options = new RequestOptions({ headers: headers });

    return this._http.get('http://api.football-data.org/v1/competitions/'
      + compId + '/leagueTable', options)
      .map(this.extractData).catch(this.errorHandle);
  }

  getPlayerList(id): Observable<any> {

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Response-Control': 'minified',
      'X-Auth-Token': '5d07c802527043949ca85d47ec98090a'
    });
    const options = new RequestOptions({ headers: headers });

    return this._http.get('http://api.football-data.org/v1/teams/'
      + id + '/players', options)
      .map(this.extractData).catch(this.errorHandle);
  }

  getFixtures(id, num): Observable<any> {

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Response-Control': 'minified',
      'X-Auth-Token': '5d07c802527043949ca85d47ec98090a'
    });
    const options = new RequestOptions({ headers: headers });
    // &venue=home
    return this._http.get('http://api.football-data.org/v1/teams/'
      + id + '/fixtures', options)
      .map(this.extractData).catch(this.errorHandle);
  }

  extractData(res: Response) {
    return res.json();
  }

  errorHandle(err: Response) {
    return Observable.throw(err.status);
  }
}
