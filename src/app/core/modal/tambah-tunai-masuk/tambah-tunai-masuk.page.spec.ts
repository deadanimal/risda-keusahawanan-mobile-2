import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TambahTunaiMasukPage } from './tambah-tunai-masuk.page';

describe('TambahTunaiMasukPage', () => {
  let component: TambahTunaiMasukPage;
  let fixture: ComponentFixture<TambahTunaiMasukPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahTunaiMasukPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TambahTunaiMasukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
