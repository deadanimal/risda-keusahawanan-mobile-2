import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarikhLawatanPgwPage } from './tarikh-lawatan-pgw.page';

describe('TarikhLawatanPgwPage', () => {
  let component: TarikhLawatanPgwPage;
  let fixture: ComponentFixture<TarikhLawatanPgwPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TarikhLawatanPgwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarikhLawatanPgwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
