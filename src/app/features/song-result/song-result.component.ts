import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import * as RecordRTC from "recordrtc";
import { baseURL } from 'src/app/shared/baseurl';
import { PlayerService } from '../player.service';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-result',
  templateUrl: './song-result.component.html',
  styleUrls: ['./song-result.component.scss']
})
export class SongResultComponent implements OnInit {

  id: any;

  songResult: any;

  constructor(private route: ActivatedRoute,
    private songService: SongService,
    private playerService: PlayerService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    this.loadSongResult(this.id);
  }

  playSong(songResult: any){
    this.playerService.song$.next(songResult);
  }

  loadSongResult = (id: any) => {
    this.songService.get(id).subscribe((data: any) => {
      this.songResult = {
        ...data,
        image: this.domSanitizer.bypassSecurityTrustUrl(baseURL + data.image),
        link: this.domSanitizer.bypassSecurityTrustUrl(baseURL + data.link),
        singerName: data.singer?.nickname,
        singerFullName: data.singer?.fullname,
      }
    });
  };
}
