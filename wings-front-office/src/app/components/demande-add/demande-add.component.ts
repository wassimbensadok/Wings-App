import { Component, OnChanges, OnInit } from '@angular/core';
import { AddressService } from 'src/app/_service/address.service';
import { DemandService } from 'src/app/_service/demand.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demande-add',
  templateUrl: './demande-add.component.html',
  styleUrls: ['./demande-add.component.css']
})
export class DemandeAddComponent implements OnInit {
 
demand: any = {
  departGov:'',
  departAdr:'',
  arriGov:'',
  arriAdr:'',
  type: '',
  tel_receiver: '',
  date: '',
  remark: '',
  weight: '',
  height: '',
  length: '',
  userId:''
};

IsSubmitted = false;
Governorates: any;
GovernoratesII: any;
GovId: any;
Citys: any;
CitysII: any;
  selectedFiles:FileList | any;
  currentFile:  File | any;
  
  http: any;
  
  currentUser: any;

  url: any;
  constructor(private demandService : DemandService, private addressService:  AddressService,private token: TokenStorageService) { }
 
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js"); 
    this.retrieveGov();

    (document.getElementById("weight") as HTMLInputElement).disabled=true,
    (document.getElementById("length") as HTMLInputElement).disabled=true,
    (document.getElementById("height") as HTMLInputElement).disabled=true,
    (document.getElementById("fileInput") as HTMLInputElement).disabled=true

    
    
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
    
    const maDate: Date = new Date(this.demand.date);
    let now = maDate.getFullYear() + '/' + ((maDate.getMonth() + 1)) + '/' + maDate.getDate()
   
  
    this.demand.date_delivery=now;
    this.demand.userId=userid;
    
    if(this.demand.type == "colis"){

      const data = {
        departGov: this.demand.departGov,
        departAdr: this.demand.departAdr,
        arriGov: this.demand.arriGov,
        arriAdr: this.demand.arriAdr,
        type: this.demand.type,
        tel_receiver: this.demand.tel_receiver,
        remark: this.demand.remark,
        date_delivery: now,
        weight: this.demand.weight,
        height: this.demand.height,
        length: this.demand.length,
        userId: userid,
      };

    this.currentFile = this.selectedFiles.item(0);
    console.log(data);
    console.log(this.currentFile);
    
    this.demandService.create(data,this.currentFile).subscribe(
      response => {
        Swal.fire(
          'Bien!',
          'Votre demande est enregistrée!',
          'success'
        )
        console.log(response);
      },
      error => {
        if(error.status == "201"){
          Swal.fire(
            'Bien!',
            'Votre demande est enregistrée!',
            'success'
          )
        }else{
          Swal.fire(
            'Oops!',
            "Votre demande n'a pas pu être enregistrée, veuillez vérifier vos informations!",
            'error'
          )
        }
        console.log(error);
      });
    }else if(this.demand.type == "enveloppe") {
      const data = {
        departGov: this.demand.departGov,
        departAdr: this.demand.departAdr,
        arriGov: this.demand.arriGov,
        arriAdr: this.demand.arriAdr,
        type: this.demand.type,
        tel_receiver: this.demand.tel_receiver,
        remark: this.demand.remark,
        date_delivery: now,
        userId: userid,
      };
      console.log(data);
      this.demandService.createII(data).subscribe(
        response => {
          Swal.fire(
            'Bien!',
            'Votre demande est enregistrée!',
            'success'
          )
        },
        error => {
          if(error.status == "201"){
            Swal.fire(
              'Bien!',
              'Votre demande est enregistrée!',
              'success'
            )
          }else{
            Swal.fire(
              'Oops!',
              "Votre demande n'a pas pu être enregistrée, veuillez vérifier vos informations!",
              'error'
            )
          }
        });
    }
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
 
  selectChangeHandler2(event:any ) {
    if(event.target.value =='enveloppe'){
      (document.getElementById("weight") as HTMLInputElement).disabled=true,
      (document.getElementById("length") as HTMLInputElement).disabled=true,
      (document.getElementById("height") as HTMLInputElement).disabled=true,
      (document.getElementById("uploads") as HTMLInputElement).disabled=true
    }
    else{
      (document.getElementById("weight") as HTMLInputElement).disabled=false,
      (document.getElementById("length") as HTMLInputElement).disabled=false,
      (document.getElementById("height") as HTMLInputElement).disabled=false,
      (document.getElementById("fileInput") as HTMLInputElement).disabled=false
    }  
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

  

  selectFile(event:any): void {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }

  showInfoAlert(){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }

}



