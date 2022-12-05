import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-song-regconition',
  templateUrl: './song-regconition.component.html',
  styleUrls: ['./song-regconition.component.scss']
})
export class SongRegconitionComponent implements OnInit {

  listening = false;

  constructor(private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isListening(){
    this.listening = true;
    setTimeout(() => this.listening = false ,5000);
  }

}
