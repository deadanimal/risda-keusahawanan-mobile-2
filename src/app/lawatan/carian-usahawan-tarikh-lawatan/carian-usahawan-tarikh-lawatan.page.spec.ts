import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CarianUsahawanTarikhLawatanPage } from './carian-usahawan-tarikh-lawatan.page';

describe('CarianUsahawanTarikhLawatanPage', () => {
  let component: CarianUsahawanTarikhLawatanPage;
  let fixture: ComponentFixture<CarianUsahawanTarikhLawatanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CarianUsahawanTarikhLawatanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CarianUsahawanTarikhLawatanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
