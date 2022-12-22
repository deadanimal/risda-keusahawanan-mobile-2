import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KemaskiniTunaiMasukPage } from './kemaskini-tunai-masuk.page';

describe('KemaskiniTunaiMasukPage', () => {
  let component: KemaskiniTunaiMasukPage;
  let fixture: ComponentFixture<KemaskiniTunaiMasukPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KemaskiniTunaiMasukPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KemaskiniTunaiMasukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
