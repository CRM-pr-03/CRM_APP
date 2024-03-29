import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  
  styleUrl:'./signup.component.css'
})
export class SignupComponent implements OnInit{
user: any;
email: any;
submitted=false;
  fm! : FormGroup;
fg: any;
     constructor(
    private fb:FormBuilder,
    private api:SignupService,
    private _router:Router,
    private toast:ToastrService
    ) {
   
   }
 
  ngOnInit(): void {
    this.createForm();
  }
 
  createForm(){
    this.fm=this.fb.group({
      'firstname':['',Validators.required],
      'lastname':['',Validators.required],
      'email': ['', [Validators.required, Validators.email]],
       'mobile':['',[Validators.required, Validators.pattern('^\\d{10}$')]],
      'password': ['', [Validators.required, Validators.minLength(8), this.customPasswordValidator()]],
     
     
    })
  }
  customPasswordValidator(): any | string {
    return (control: any) => {
      const password = control.value;
      if (!password) {
        return null;
      }
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      const isValid = hasUppercase && hasLowercase && hasNumber;
      return isValid ? null : { invalidPassword: true };
    };
  }
 
  registeruser(values:any){
    this.submitted=true
    
    if(this.fm.valid){
      console.log(values)
      this.api.register(values).subscribe({
        next:resp=>{
        console.log(resp)
        
         this.toast.success('Registered successfully')        
          this._router.navigate(['login'])
        },
      error:err=>{
        console.log(err)
     
         this.toast.error('Invalid',"Registration Failed")
      }
    })
    }}}