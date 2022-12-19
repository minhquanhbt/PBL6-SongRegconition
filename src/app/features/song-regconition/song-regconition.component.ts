import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faSpinner, faArrowUp } from '@fortawesome/pro-solid-svg-icons';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-regconition',
  templateUrl: './song-regconition.component.html',
  styleUrls: ['./song-regconition.component.scss']
})
export class SongRegconitionComponent implements OnInit {

  listening = false;
  isImporting = false;
  faSpinner = faSpinner;
  faArrowUp = faArrowUp;

  constructor(
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private songService: SongService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isListening(){
    this.listening = true;
    setTimeout(() => {this.listening = false; window.location.href = '/app/song-result'} ,5000);
  }

  onFileImportSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      event.target.value = null;
      this.isImporting = true;
      

    }
  }
}