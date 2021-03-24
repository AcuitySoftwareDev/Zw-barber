import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBarberPage } from './add-barber.page';

describe('AddBarberPage', () => {
  let component: AddBarberPage;
  let fixture: ComponentFixture<AddBarberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBarberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBarberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
