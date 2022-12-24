import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as RecordRTC from "recordrtc";

@Component({
  selector: 'app-song-result',
  templateUrl: './song-result.component.html',
  styleUrls: ['./song-result.component.scss']
})
export class SongResultComponent implements OnInit {

  id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.id = params['id']);
    console.log(this.id)
  }

}
