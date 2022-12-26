import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, Observable, Subject } from 'rxjs';
import { ISong } from '../shared/api-interfaces';
import { baseURL } from '../shared/baseurl';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  song$ = new Subject();

  currentProgress$ = new Subject();
  currentTime$ = new Subject();

  audio = new Audio();
  isPlaying = false;
  activeSong: any;
  durationTime: string = "";
  private _songList = new Subject<ISong[]>();
  private _playingTime = new Subject<string>();
  private _playingFailed = new Subject<string>();

  getSongPlaying(id:any): Observable<any> {
    return this._songList.pipe(filter((item:any) => item.id === id));
  }

  getSongList() {
    return this._songList.asObservable();
  }

  getSongTime(): Observable<string> {
    return this._playingTime.asObservable();
  }

  playingFailed(): Observable<string> {
    return this._playingFailed.asObservable();
  }

  constructor(private songService: SongService,
    private domSanitizer: DomSanitizer) { }

  // Generate minutes from audio time
  generateMinutes(currentTime: number): number | string {
    const secsFormula = Math.floor(currentTime / 60);
    return secsFormula < 10 ? '0' + String(secsFormula) : secsFormula;
  }

  // Generate seconds from audio time
  generateSeconds(currentTime: number): number | string {
    const secsFormula = Math.floor(currentTime % 60);
    return secsFormula < 10 ? '0' + String(secsFormula) : secsFormula;
  }

  generateTimeToDisplay(currentMinutes: any, currentSeconds: any): string {
    return `${currentMinutes}:${currentSeconds}`;
  }

  getListOfSongs(){
    this.songService.list().subscribe((data: any) => {
      var i = 1;
      data.forEach((item: any) => {
        if(i<11){
          item.stt = i;
          i++;
        }
        item.image = this.domSanitizer.bypassSecurityTrustUrl(baseURL + item.image);
        item.link = this.domSanitizer.bypassSecurityTrustUrl(baseURL + item.link);
        item.singerName = item.singer?.nickname;
        item.singerFullName = item.singer?.fullname;
      })
      this._songList.next([...data]);
    });
  }
}
