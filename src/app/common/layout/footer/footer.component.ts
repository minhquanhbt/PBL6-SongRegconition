import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faPlay, faBackwardStep, faPause, faForwardStep, faVolume, faVolumeXmark } from '@fortawesome/pro-solid-svg-icons';
import { BehaviorSubject, Subject } from 'rxjs';
import { AudioRecordingService } from 'src/app/features/audio-recording.service';
import { PlayerService } from 'src/app/features/player.service';
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
  currentTime$ = new BehaviorSubject("00:00");
  songList: any[] = [];
  audio = new Audio();
  activeSong: any;
  durationTime: any = "00:00";
  maxDuration: any;

  constructor(private playerService: PlayerService,
    private audioRecordingService: AudioRecordingService,
    private domSanitizer: DomSanitizer) {
      this.audio.volume = 1;
      audioRecordingService.recording().subscribe((recording: any) => {
        if(recording == "true"){
          this.isPlaying = false;
          this.audio.pause();
        }
      })
      playerService.song$.subscribe((song) => {
        this.durationTime = "00:00"
        this.activeSong = song;
        this.audio.src = domSanitizer.sanitize(SecurityContext.URL,this.activeSong.link) || " ";
        this.audio.addEventListener("timeupdate", (currentTime)=>{
          this.onTimeUpdate();
        });
        this.audio.addEventListener('ended',(currentTime)=>{
          this.playNextSong();
        });
        this.audio.load();
        this.audio.play();
        this.isPlaying = true;
      })
    }

  ngOnInit(): void {
    this.playerService.getListOfSongs();
    this.playerService.getSongList().subscribe((items) => {
      this.songList = items;
    });
  }

  seekToTime(value:any){
    this.audio.currentTime = value;
  }

  changeVolume(value:any){
    this.audio.volume = value;
  }

  setSongDuration(): void {
    this.maxDuration = Math.floor(this.audio.duration);
    const durationInMinutes = this.playerService.generateMinutes(this.audio.duration);
    const durationInSeconds = this.playerService.generateSeconds(this.audio.duration);

    if (!isNaN(this.audio.duration)) {
      this.durationTime = this.playerService.generateTimeToDisplay(durationInMinutes, durationInSeconds);
    }
  }

  onTimeUpdate() {

    // Set song duration time
    if (this.durationTime == "00:00") {
      this.setSongDuration();
    }

    // Emit converted audio currenttime in user friendly ex. 01:15
    const currentMinutes = this.playerService.generateMinutes(this.audio.currentTime);
    const currentSeconds = this.playerService.generateSeconds(this.audio.currentTime);
    this.currentTime$.next(this.playerService.generateTimeToDisplay(currentMinutes, currentSeconds));

    this.currentProgress$.next(Math.floor(this.audio.currentTime));
  }

  pauseOrPlay(){
    if(!this.isPlaying){
      if(this.activeSong){
        this.isPlaying = true;
        this.audio.play();
      }
    }
    else {
      this.isPlaying = false;
      this.audio.pause()
    };
  }

  playNextSong(): void {
    const songIndex = this.songList.findIndex((song) => song.id === this.activeSong.id);
    const nextSongIndex = songIndex + 1; 

    if (!this.songList[nextSongIndex]) {
      this.playerService.song$.next(this.songList[0]);
    } else {
      this.playerService.song$.next(this.songList[nextSongIndex]);
    }
  }

  playPreviousSong(): void {
    const songIndex = this.songList.findIndex((song) => song.id === this.activeSong.id);
    const prevSongIndex = songIndex - 1;
    if (!this.songList[prevSongIndex]) {
      this.playerService.song$.next(this.songList[this.songList.length - 1]);
    } else {
      this.playerService.song$.next(this.songList[prevSongIndex]);
    }
  }
}
