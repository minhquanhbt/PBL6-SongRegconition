import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faSpinner, faArrowUp } from '@fortawesome/pro-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AudioRecordingService } from '../audio-recording.service';
import { SongService } from '../song.service';

@Component({
  selector: 'app-song-regconition',
  templateUrl: './song-regconition.component.html',
  styleUrls: ['./song-regconition.component.scss']
})
export class SongRegconitionComponent implements OnInit {

  isImporting = false;
  faSpinner = faSpinner;
  faArrowUp = faArrowUp;

  isRecording = false;
  recordedTime: any;

  teste: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private toastrService: ToastrService,
    private audioRecordingService: AudioRecordingService,
    private songService: SongService,
    private router: Router) {
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      var file = new File([data.blob], data.title, {type: data.blob.type});
      this.identifySong(file);
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isListening(){
    this.startRecording();
    setTimeout(() => {this.stopRecording()} ,20000);
  }

  identifySong(file: any){
    this.audioRecordingService._recording.next("true")
    this.songService.identifySong(file).subscribe((res: any) => {
      this.isImporting = false;
      if (res){
        this.router.navigate(['/app/song-result', res.music.pk])
      }
    }, (error) => {
      this.toastrService.error('Đã có lỗi khi nhập dữ liệu');
      this.isImporting = false;
    })
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  onFileImportSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      event.target.value = null;
      this.isImporting = true;
      this.identifySong(file);
    }
  }
}