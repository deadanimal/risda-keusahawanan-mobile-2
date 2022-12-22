import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KemaskiniLaporanPage } from './kemaskini-laporan.page';

describe('KemaskiniLaporanPage', () => {
  let component: KemaskiniLaporanPage;
  let fixture: ComponentFixture<KemaskiniLaporanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KemaskiniLaporanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KemaskiniLaporanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
