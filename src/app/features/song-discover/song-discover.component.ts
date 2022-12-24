import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { baseURL } from 'src/app/shared/baseurl';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-song-discover',
  templateUrl: './song-discover.component.html',
  styleUrls: ['./song-discover.component.scss']
})
export class SongDiscoverComponent implements OnInit {

  faSearch = faSearch;

  songList: any[] = [];
  resultSong: any[] = [];
  temp: any;

  isSearch = false;

  constructor(private songService: SongService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadSongsList();
  }

  playSong(song: any){
    this.songService.song$.next(song);
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
    this.temp = [...this.songList];
  }

  updateFilter(event: any) {
    this.isSearch = true;
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter((d: any) => {
        return d.name.toLowerCase().indexOf(val) !== -1 || d.singerName.toLowerCase().indexOf(val) !== -1 || d.singerFullName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if(val == "") {
      this.resultSong = [];
      this.isSearch = false;
    }
    // update the rows
    else {
      this.resultSong = temp;
    }
  }
}
