import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { EmployeeService } from '../employee.service';

import { EmployeeDetailsComponent } from './employee-details.component';

/*describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let element;

  const mockApiService = {
    getEmployeeDetails: (id) => Promise.resolve(mockEmployee[3])
  };

  const mockActivatedRoute = {
    params: of({ id: 'f1b2e9bf-2794-4ccf-a869-9ddb93478f70'})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should set the correct employee Firstname', async(() => {
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const Firstname = element.querySelector('.header');
        expect(Firstname.textContent).toBe('Chandru');
      });
  }));

  it('should set the correct employee Lastname', async(() => {
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const Lastname = element.querySelector('.header');
        expect(Lastname.textContent).toBe('K');
      });
  }));

  it('should set the correct employee email', async(() => {
    fixture.detectChanges();

    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        const EmailId = element.querySelector('.email');
        expect(EmailId.textContent.trim()).toBe('You can\'t program the bus without bypassing the redundant RSS circuit!');
      });
  }));
});*/
class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

xdescribe('ProductDetailComponent', () => {
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let component: EmployeeDetailsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [HttpModule, RouterTestingModule],
      declarations: [EmployeeDetailsComponent],
      providers: [
        EmployeeService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    });

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should show product details for a particular product', () => {
    component.employee = {
      id: 1,
          firstName:'',
          lastName:'',
          emailId:'@gmail.com',
          enabled:'true',
    };

    fixture.detectChanges();

    const nameElement: HTMLElement = fixture.debugElement.query(
      By.css('.FirstName')
    ).nativeElement;
    const descriptionElement: HTMLElement = fixture.debugElement.query(
      By.css('#LastName')
    ).nativeElement;
    const availabilityElement: HTMLElement = fixture.debugElement.query(
      By.css('#emailid')
    ).nativeElement;
    const priceElement: HTMLElement = fixture.debugElement.query(
      By.css('#enabled')
    ).nativeElement;

    expect(nameElement.innerText).toContain('Geetha');
    expect(descriptionElement.innerText).toContain('Rajan');
    expect(availabilityElement.innerText).toContain('GeethaRajan@gmail.com');
    expect(priceElement.innerText).toContain('true');
  });

  

  it('should navigate the user to the `Not Found` component when an invalid Employee id is passed', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 'abc' });

    expect(spy).toHaveBeenCalledWith(['/not-found']);
  });
});