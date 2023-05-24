import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalHabilidadesCvPage } from './modal-habilidades-cv.page';

describe('ModalHabilidadesCvPage', () => {
  let component: ModalHabilidadesCvPage;
  let fixture: ComponentFixture<ModalHabilidadesCvPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHabilidadesCvPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalHabilidadesCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
