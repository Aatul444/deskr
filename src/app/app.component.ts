import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KeyValuePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  form!: FormGroup;
  customers: any = {}

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({});
      this.getUsers()
  }

  ngOnInit() {
    for (const customerKey of Object.keys(this.customers)) {
      for (const customer of this.customers[customerKey]) {
        for (const key of Object.keys(customer)) {
          let validators = [];
          if (key === 'accountholder' || key === 'accountnumber') {
            validators.push(Validators.required);
          }
          if (key === 'ifsccode') {
            validators.push(Validators.pattern('[A-Za-z0-9]{11}'));
          }
          else{
            validators.push(Validators.required);
          }
          this.form.addControl(key, new FormControl(customer[key], validators));
        }
      }
    }
  }
  
  onSubmit() {
    console.log('form',this.form);
    const headers = new HttpHeaders({
      'authkey': 'test-angular-2021'
    });
    const body={
      token:'e090c25187ee2b3f9f1f8a02747356641',
      authToken:'e090c25187ee2j890890skjb3f9f1f8a027r7kjd99',
      json:this.customers
    }
    this.http.post('https://paysprint.in/service-api/testangular/api/TestAngular/createDynamicform',body,{ headers: headers }).subscribe((result:any)=>{console.log(result.message)})
  }
  
  getvalue(cusValues: any) {
    return cusValues.value
  }
  
  getUsers() {
    const headers = new HttpHeaders({
      'authkey': 'test-angular-2021'
    });
    const body = {
      token: 'e090c25187ee2b3f9f1f8a02747356641',
      authToken: 'e090c25187ee2j890890skjb3f9f1f8a027r7kjd99'
    }
    this.http.post('https://paysprint.in/service-api/testangular/api/TestAngular/getDynamicform', body, { headers: headers })
    .subscribe(
      (res: any) => {
        res.status?this.customers = res.data[0]:console.log(res.statuscode)
      },
      (error: any) => {
        console.error(error);
      }
    );
  
  }
  postString(str:any){
    return str
  }
}
// "rnfi": [
//   { "accountholder": "Rishav Kumar", "accountnumber": 99344642625, "bankname": "SBI", "ifsccode": "SBIN00123", "balance": 1250, "Address": "Mumbai Mayur Vihar" },
//   { "accountholder": "Pankaj Kumar", "accountnumber": 7845968552, "bankname": "FINO", "ifsccode": "FINO00123", "balance": 100 },
//   { "accountholder": "Suraj Kumar", "accountnumber": 7845996857, "bankname": "FINO", "ifsccode": "FINO00123", "balance": 950 },
//   { "accountholder": "Gaurav Gangwar", "accountnumber": 7845968574, "bankname": "INDUS", "ifsccode": "INDUS00123", "balance": 120 }
// ],
// "pivotal": [
//   { "accountholder": "Rishav Kumar", "accountnumber": 7845968545, "bankname": "SBI", "ifsccode": "SBIN00123", "balance": 900 },
//   { "accountholder": "Pankaj Kumar", "accountnumber": 7845968552, "bankname": "FINO", "ifsccode": "FINO00123", "balance": 10 },
//   { "accountholder": "Suraj Kumar", "accountnumber": 7845996857, "bankname": "FINO", "ifsccode": "FINO00123", "balance": 900 }
// ],
// "paysprint": [
//   { "accountholder": "Sonu Kumar", "accountnumber": 7845968545, "bankname": "SBI", "ifsccode": "SBIN00123", "balance": 450 },
//   { "accountholder": "saurav Kumar", "accountnumber": 7845968552, "bankname": "FINO", "ifsccode": "FINO00123", "balance": 10 },
//   { "accountholder": "PkUN Kumar", "accountnumber": 7845968552, "bankname": "FINO", "ifsccode": "FINO00123", "balance": 10, "credit_ba": 789 },
//   { "accountholder": "RAJAT BALIA", "accountnumber": 9875478596, "bankname": "SBI", "ifsccode": "SBIN008596", "balance": 600, "credit_ba": 0, "new_credit": 78 }
// ]