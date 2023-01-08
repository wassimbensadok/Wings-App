import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from 'src/app/_service/address.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})

export class UserRegisterComponent implements OnInit {
  email:any;
  public showPassword: boolean | undefined;
  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    gov : null,
    city : null,
    password: null,
    phone : null,
    role : ["user"]
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  Governorates: any;
  GovId: any;
  Citys: any;
  selectedGov = null;
  constructor(private authService: AuthService,private addressService : AddressService) { }

  ngOnInit(): void {
    this.retrieveGov();

  }

  onSubmit(): void{
    
    const { firstname,lastname,email,gov,city,password,phone,role} = this.form;
    this.authService.register(firstname,lastname,email,gov,city,password,phone,role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  retrieveGov(): void {
    this.addressService.getAllGov()
      .subscribe(
        data => {
          this.Governorates = data;
        });
  }

  
  selectChangeHandler (event: any) {
    this.selectedGov = event.target.value;
    
      this.addressService.getGovByName(this.selectedGov)
        .subscribe(
          data => {
            this.addressService.getCityByGov(data)
            .subscribe(
              data => {
                this.Citys = data;
              });
          });
     
    
  }
  
}
