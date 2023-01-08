import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/_service/address.service';
import { AuthService } from 'src/app/_service/auth.service';
import { ShopService } from 'src/app/_service/shop.service';

@Component({
  selector: 'app-user-pro-register',
  templateUrl: './user-pro-register.component.html',
  styleUrls: ['./user-pro-register.component.css']
})
export class UserProRegisterComponent implements OnInit {
  public showPassword: boolean | undefined;
  form: any = {
    firstname: null,
    lastname: null,
    tax_num: null,
    establishment_name: null,
    email: null,
    gov: null,
    city: null,
    password: null,
    phone: null,
    role: ["userPro", "user"],
  };
  card = {
    ShopName: '',
    type: '',
    commercial_register: '',
    WebSite: ''
  }
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  Governorates: any;
  GovId: any;
  Citys: any;
  selectedGov = null;
  currentFile: any;
  constructor(private authService: AuthService, private addressService: AddressService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.loadJsFile("assets/js/scriptMultiStepRegister.js");
    this.retrieveGov();
  }

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  onSubmit(): void {

    const { firstname, lastname, tax_num, establishment_name, email, gov, city, password, phone, role } = this.form;
    console.log(firstname, lastname, tax_num, establishment_name, email, gov, city, password, phone, role);
    this.authService.UserPro_register(firstname, lastname, tax_num, establishment_name, email, gov, city, password, phone, role).subscribe({
      next: data => {
        console.log(data.message);
        const card = {
          id: "0",
          type: this.card.type,
          commercial_register: "",
          userProId: data.message,
          shopName: this.card.ShopName,
          webSite: this.card.WebSite
        };
        console.log(card);
        this.shopService.createCarde(card,this.currentFile).subscribe({
          next: datas => {
            console.log(datas);
          },
          error: errs => {
            console.log(errs);
          }
        });
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


  selectChangeHandler(event: any) {
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

  selectFile(event: any): void {
    this.currentFile = event.target.files[0];
  }

}
