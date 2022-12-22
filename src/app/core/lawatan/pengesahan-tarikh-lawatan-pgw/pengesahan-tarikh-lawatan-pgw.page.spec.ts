import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PengesahanTarikhLawatanPgwPage } from './pengesahan-tarikh-lawatan-pgw.page';

describe('PengesahanTarikhLawatanPgwPage', () => {
  let component: PengesahanTarikhLawatanPgwPage;
  let fixture: ComponentFixture<PengesahanTarikhLawatanPgwPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PengesahanTarikhLawatanPgwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PengesahanTarikhLawatanPgwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
