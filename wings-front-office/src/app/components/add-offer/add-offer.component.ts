import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/_service/address.service';
import { OfferService } from 'src/app/_service/offer.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
 
  offer: any = {
    departGov:'',
    departAdr:'',
    arriGov:'',
    arriAdr:'',
    date_delivery: '',
    date_deadline: '',
    price: '',
    remark: '',
    userId:''
  };
  
  submitted = false;
  selectedDat: string = '';
  selectedDay: string = '';
  Governorates: any;
  GovernoratesII: any;
  GovId: any;
  Citys: any;
  CitysII: any;
    selectedFiles:FileList | any;
    currentFile:  File | any;
 
    currentUser:any;
  constructor(private offerService: OfferService, private addressService:  AddressService, private token: TokenStorageService, private currencyPipe : CurrencyPipe) { }

  ngOnInit(): void {
     
    this.currentUser = this.token.getUser();
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js");
    this.loadJsFile("assets/js/currency.js"); 
    this.retrieveGov();
  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

 
  


  saveDemand(): void{
    const user = this.token.getUser();
    const userid = user.id;
    let maDate: Date = new Date(this.offer.date_delivery);
    let date_delivery = maDate.getFullYear() + '/' + ((maDate.getMonth() + 1)) + '/' + maDate.getDate()
    maDate= new Date(this.offer.date_deadline);
    let date_deadline = maDate.getFullYear() + '/' + ((maDate.getMonth() + 1)) + '/' + maDate.getDate()
    
    this.offer.date_delivery=date_delivery;
    this.offer.date_deadline=date_deadline;
    this.offer.userId=userid;
    let price: string = this.offer.price;
    price = price.toString().substring(2,price.length);
    let arr = Array.from(price);

    arr.forEach((letter, i) => { if(letter === ',' && i !== 0) arr[i] = "" });

   
    price = price.replace(',','');
      const data = {
        departGov: this.offer.departGov,
        departAdr: this.offer.departAdr,
        arriGov: this.offer.arriGov,
        arriAdr: this.offer.arriAdr,
        date_delivery: this.offer.date_delivery,
        date_deadline: this.offer.date_deadline,
        price: arr.join(""),
        comment: this.offer.remark,
        userId: userid,
      };
      console.log(data);
      console.log(this.offer.price);
      this.offerService.createoffer(data).subscribe(
        response => {
          console.log(response);
          Swal.fire(
            'Bien!',
            'Votre offer est enregistrée!',
            'success'
          )
        },
        error => {
          if(error.status == "201"){
            Swal.fire(
              'Bien!',
              'Votre offer est enregistrée!',
              'success'
            )
          }else{
            Swal.fire(
              'Oops!',
              "Votre offer n'a pas pu être enregistrée, veuillez vérifier vos informations!",
              'error'
            )
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
      this.addressService.getGovByName(event.target.value)
        .subscribe(
          data => {
            this.addressService.getCityByGov(data)
            .subscribe(
              data => {
                this.Citys = data;
              });
          });  
  }
 

  onFileSelected(){}

  selectChangeHandlerII (event: any) {
      this.addressService.getGovByName(event.target.value)
        .subscribe(
          data => {
            this.addressService.getCityByGov(data)
            .subscribe(
              data => {
                this.CitysII = data;
              });
          });   
  }

  
  
}
