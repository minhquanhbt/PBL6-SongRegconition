import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faPlay, faBackwardStep, faPause, faForwardStep, faVolume, faVolumeXmark } from '@fortawesome/pro-solid-svg-icons';
import { BehaviorSubject, Subject } from 'rxjs';
import { SongService } from 'src/app/features/song.service';
import { baseURL } from 'src/app/shared/baseurl';

@Component({
  selector: 'm-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faPlay = faPlay;
  faBackwardStep = faBackwardStep;
  faForwardStep = faForwardStep;
  faPause = faPause;
  faVolume = faVolume;
  faVolumeXmark = faVolumeXmark;

  isPlaying = false;
  isClicked = false;

  currentProgress$ = new BehaviorSubject(0);
  currentTime$ = new Subject();
  songList: any[] = [];
  audio = new Audio();
  activeSong: any;
  durationTime: string = "0";

  constructor(private songService: SongService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  loadSongsList = () => {
    this.songService.list().subscribe((data: any) => {
        this.songList = data;
        this.editSongList();
    });
  };

  editSongList() {
    var i = 1;
    this.songList.forEach((item) => {
      if(i<11){
        item.stt = i;
        i++;
      }
      item.image = this.domSanitizer.bypassSecurityTrustUrl(baseURL + item.image);
      item.singerName = item.singer?.nickname;
      item.singerFullName = item.singer?.fullname;
    })
   // this.temp = [...this.songList];
  }
}
