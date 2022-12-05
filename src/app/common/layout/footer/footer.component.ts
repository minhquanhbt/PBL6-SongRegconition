import { Component, OnInit } from '@angular/core';
import { faPlay, faBackwardStep, faPause, faForwardStep, faVolume, faVolumeXmark } from '@fortawesome/pro-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {
  }

}
