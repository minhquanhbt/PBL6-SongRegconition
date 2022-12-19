import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { baseURL } from 'src/app/shared/baseurl';

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

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.loadSongsList();
  }

  loadSongsList = () => {
    this.songService.list().subscribe((data: any) => {
        this.songList = data;
        this.editSongList();
    });
  };

  editSongList() {
    this.songList.forEach((item) => {
      item.image = baseURL + item.image;
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
      document.body.style.setProperty('--height', "0px");
    }
    // update the rows
    else {
      document.body.style.setProperty('--height', "70px");
      this.resultSong = temp;
    }
  }
}
