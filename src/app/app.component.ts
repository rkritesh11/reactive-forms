import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { timeout } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUserNames = ['Chris', 'Anna'];
  forbiddenEmails = ['test@test.com'];

  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNamesValidator.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmailValidator]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signupForm.valueChanges.subscribe((value: FormData) => {
    //   console.log(value);
    // });

    this.signupForm.statusChanges.subscribe((value: string) => {
      console.log(value);
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  hobbie() {
    const formControl = new FormControl(null, [Validators.required]);
    (<FormArray>this.signupForm.get('hobbies')).push(formControl);
  }

  forbiddenNamesValidator(control: FormControl): { [key: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'forbiddenName': true };
    }
    return null;
  }

  forbiddenEmailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      }, 1500);


    });
    return promise;
  }
}
