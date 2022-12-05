import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDiscoverComponent } from './song-discover.component';

describe('SongDiscoverComponent', () => {
  let component: SongDiscoverComponent;
  let fixture: ComponentFixture<SongDiscoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongDiscoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
