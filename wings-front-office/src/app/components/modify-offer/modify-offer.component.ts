import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from 'src/app/_service/address.service';
import { OfferService } from 'src/app/_service/offer.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-offer',
  templateUrl: './modify-offer.component.html',
  styleUrls: ['./modify-offer.component.css']
})
export class ModifyOfferComponent implements OnInit {
  offers:any;
  offer: any = {
    departGov:'',
    departAdr:'',
    arriGov:'',
    arriAdr:'',
    date_delivery: Date,
    date_deadline: '',
    price: '',
    remark: '',
    userId:''
  };
  
  submitted = false;
  Governorates: any;
  GovernoratesII: any;
  GovId: any;
  Citys: any;
  CitysII: any;
  currentUser: any;
  date_delivery: string ='';
  date_deadline: string ='';
  newDate_delivery: any;
  newDate_deadline : any;
  constructor(private offerService: OfferService, private addressService:  AddressService, private token: TokenStorageService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.offers = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.offers);
    this.date_delivery = this.offers.date_delivery;
    for(let i = 0 ; i <= this.date_delivery.length ; i++){
      this.date_delivery=this.date_delivery.replace('/','-');
    }
    this.date_deadline = this.offers.date_deadline;
    for(let i = 0 ; i <= this.date_deadline.length ; i++){
      this.date_deadline=this.date_deadline.replace('/','-');
    }
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/currency.js"); 
    this.retrieveGov();
    
    this.offer.price = this.offers.price;
    this.offer.remark =  this.offers.comment;
   
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

    let maDate: Date = new Date(this.newDate_delivery);
    this.newDate_delivery = maDate.getFullYear() + '/' + ((maDate.getMonth() + 1)) + '/' + maDate.getDate();
    maDate= new Date(this.newDate_deadline);
    this.newDate_deadline = maDate.getFullYear() + '/' + ((maDate.getMonth() + 1)) + '/' + maDate.getDate();
    console.log(this.newDate_delivery);
    console.log(this.newDate_deadline);
    
   
    this.offer.userId=userid;
    let price: string = this.offer.price;
    //price = price.toString().substring(2,price.length);
    let arr = Array.from(price);

    arr.forEach((letter, i) => { if(letter === ',' && i !== 0) arr[i] = "" });

   
    //price = price.replace(',','');
     const data = {
        departGov: this.offer.departGov,
        departAdr: this.offer.departAdr,
        arriGov: this.offer.arriGov,
        arriAdr: this.offer.arriAdr,
        date_delivery: this.newDate_delivery,
        date_deadline: this.newDate_deadline,
        price: arr.join(""),
        comment: this.offer.remark,
        userId: userid,
      };
      if(data.departGov == '')
      data.departGov = this.offers.route.depar_gov;
      if(data.departAdr == '')
      data.departAdr = this.offers.route.adr_departure;
      if(data.arriGov == '')
      data.arriGov = this.offers.route.arri_gov;
      if(data.arriAdr == '')
      data.arriAdr = this.offers.route.depar_gov;
      if(data.date_delivery == undefined)
      data.date_delivery = this.offers.date_delivery;
      if(data.date_deadline == undefined)
      data.date_deadline = this.offers.date_deadline;
      if(data.price == "")
      data.price = this.offers.price;
      console.log(data);

      this.offerService.updateoffer(this.offers.id,data).subscribe(
        response => {
          Swal.fire(
            'Bien!',
            'Votre offer est modifeir!',
            'success'
          )
        },
        error => {
          if(error.status == "201"){
            Swal.fire(
              'Bien!',
              'Votre offer est modifier!',
              'success'
            )
          }else{
            Swal.fire(
              'Oops!',
              "Votre offer n'a pas pu être modifier, veuillez vérifier vos informations!",
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

  
  selectDate(event:any): void {
    this.newDate_delivery= event.target.value;
  }

  selectDateII(event:any): void {
    this.newDate_deadline = event.target.value;
  }
  
}

