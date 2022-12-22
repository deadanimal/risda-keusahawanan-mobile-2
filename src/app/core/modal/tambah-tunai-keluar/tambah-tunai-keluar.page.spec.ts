import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TambahTunaiKeluarPage } from './tambah-tunai-keluar.page';

describe('TambahTunaiKeluarPage', () => {
  let component: TambahTunaiKeluarPage;
  let fixture: ComponentFixture<TambahTunaiKeluarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahTunaiKeluarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TambahTunaiKeluarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
