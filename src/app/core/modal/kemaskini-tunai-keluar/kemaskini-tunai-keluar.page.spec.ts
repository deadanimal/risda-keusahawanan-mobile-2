import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KemaskiniTunaiKeluarPage } from './kemaskini-tunai-keluar.page';

describe('KemaskiniTunaiKeluarPage', () => {
  let component: KemaskiniTunaiKeluarPage;
  let fixture: ComponentFixture<KemaskiniTunaiKeluarPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KemaskiniTunaiKeluarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KemaskiniTunaiKeluarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
