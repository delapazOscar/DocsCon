import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalTerminosYCondicionesPage } from './modal-terminos-y-condiciones.page';

describe('ModalTerminosYCondicionesPage', () => {
  let component: ModalTerminosYCondicionesPage;
  let fixture: ComponentFixture<ModalTerminosYCondicionesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTerminosYCondicionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalTerminosYCondicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
