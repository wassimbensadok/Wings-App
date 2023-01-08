import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddressService } from 'src/app/_service/address.service';
import { AuthService } from 'src/app/_service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-delivery-register',
  templateUrl: './delivery-register.component.html',
  styleUrls: ['./delivery-register.component.css']
})
export class DeliveryRegisterComponent implements OnInit {
  @ViewChild('fileUploader')
  fileUploader!: ElementRef;
  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    phone : null,
    govd : null,
    cityd : null,
    cin : null,
    account_holder : null,
    bank_name : null,
    agency_name : null,
    agency_city : null,
    rib : null,
    role:["delivery","user"]
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  Governorates: any;
  GovId: any;
  Citys: any;
  agenCitys: any;
  selectedGov = null;
  currentFile:  File | any;
  currentFileII:  File | any;

  id:any;
  
  urlII: any;
  url: any;


  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  constructor(private authService: AuthService,private addressService : AddressService) { }

  ngOnInit(): void {
    this.loadJsFile("assets/js/scriptMultiStepRegister.js");  
    this.retrieveGov();
    this.retrieveCity();
  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  
  
  selectFiles(event: any): void {
    if(event.target.files.length != 2 ){
    alert("vous ne pouvez choisir que 2 images");
    this.fileUploader.nativeElement.value = null;
    }else{
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
      this.currentFile = this.selectedFiles[0];
      this.currentFileII = this.selectedFiles[1];
    }
  }
  }
 

  

  onSubmit(): void{
    console.log('/***********/');
 console.log(this.form);
 console.log(this.currentFile);
 console.log(this.currentFileII);
    const { firstname,lastname,email,gov,city,password,phone,cin,account_holder,bank_name,agency_name,agency_city,rib,role} = this.form;
    this.authService.delivery_register(firstname,lastname,email,gov,city,password,phone,cin,account_holder,bank_name,agency_name,agency_city,rib,role,this.currentFile,this.currentFileII).subscribe({
      next: _data => {
        console.log(_data);
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

  retrieveCity(): void {
    this.addressService.getAllCity()
      .subscribe(
        data => {
          this.agenCitys = data;
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
