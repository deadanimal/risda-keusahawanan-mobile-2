import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SenaraiLaporanPegawaiPage } from './senarai-laporan-pegawai.page';

describe('SenaraiLaporanPegawaiPage', () => {
  let component: SenaraiLaporanPegawaiPage;
  let fixture: ComponentFixture<SenaraiLaporanPegawaiPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SenaraiLaporanPegawaiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SenaraiLaporanPegawaiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
