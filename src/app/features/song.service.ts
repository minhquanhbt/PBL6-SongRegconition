import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISong} from '../shared/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(
      private http: HttpClient
  ) {}

  get(id: number) {
      return this.http.get<ISong>('/api/musics/' + id);
  }

  list(): Observable<ISong[]> {
      return this.http.get<ISong[]>('/api/musics');
  }

  create(Song: object) {
      return this.http.post('/api/nhan-vien', Song);
  }

  update(SongId: number, Song: object) {
      return this.http.put('/api/nhan-vien/' + SongId, Song);
  }

  remove(SongId: number) {
      return this.http.delete('/api/nhan-vien/' + SongId);
  }

  importByExcel(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('/api/nhan-vien/import-by-excel', formData);
  }
}
