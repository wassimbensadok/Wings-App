import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/_service/address.service';
import { DemandService } from 'src/app/_service/demand.service';
import { ImportInfoService} from 'src/app/_service/import-info.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

@Component({
  selector: 'app-modif-dem',
  templateUrl: './modif-dem.component.html',
  styleUrls: ['./modif-dem.component.css']
})
export class ModifDemComponent implements OnInit {
demand: any;

demande: any = {
  departGov:'',
  departAdr:'',
  arriGov:'',
  arriAdr:'',
  type: '',
  tel_receiver: '',
  remark: '',
  weight: '',
  height: '',
  length: '',
  userId:'',
  uploads: File
};
isColis = false;
submitted = false;
selectedDay: string = '';
Governorates: any;
GovernoratesII: any;
GovId: any;
Citys: any;
CitysII: any;
  selectedFile: any;
  http: any;
  
  url: any;
  date: string ='';
  newDate : any;
  constructor(private aa:ImportInfoService,private demandService: DemandService, private addressService:  AddressService,private router: Router, private activatedRoute: ActivatedRoute,private token: TokenStorageService) {
    this.demand = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.demand);
    console.log(this.demand.date_delivery);
    console.log(this.demand.route.depar_gov);
    this.date = this.demand.date_delivery;
    for(let i = 0 ; i <= this.date.length ; i++){
      this.date=this.date.replace('/','-');
    }
   
    
   }
 
  ngOnInit(): void {
    this.loadJsFile("assets/js/dropdown.js"); 
    this.loadJsFile("assets/js/uploadimg.js"); 
    this.retrieveGov();

     //this.demand = history.state;
    //console.log(this.demand);

    /*this.activatedRoute.data.subscribe(data => {
      this.demand = data;
      console.log(this.demand);
    });
      this.demande = this.demand;
      console.log(this.demand);
      console.log(this.demande);*/
      this.demande.tel_receiver= this.demand.tel_receiver;
      this.demande.remark= this.demand.remark;
      this.demande.weight= this.demand.weight;
      this.demande.height= this.demand.height;
      this.demande.length= this.demand.length;
      this.demande.uploads= this.demand.fileURL;
      if(this.demand.type == "colis"){
        this.isColis = true;
      }

      this.url = this.demand.fileURL;

  }
  getUserss(){
    console.log(this.aa.getUser.apply)
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
    
    const maDate: Date = new Date(this.newDate);
    let now = maDate.getFullYear() + '/' + ((maDate.getMonth() + 1)) + '/' + maDate.getDate()
    const data = {
      departGov: this.demande.departGov,
      departAdr: this.demande.departAdr,
      arriGov: this.demande.arriGov,
      arriAdr: this.demande.arriAdr,
      type: this.demande.type,
      tel_receiver: this.demande.tel_receiver,
      remark: this.demande.remark,
      date_delivery: now,
      weight: this.demande.weight,
      height: this.demande.height,
      length: this.demande.length,
      userId: userid,
    };
    if(data.departGov == '')
    data.departGov = this.demand.route.depar_gov;
    if(data.departAdr == '')
    data.departAdr = this.demand.route.adr_departure;
    if(data.arriGov == '')
    data.arriGov = this.demand.route.arri_gov;
    if(data.arriAdr == '')
    data.arriAdr = this.demand.route.depar_gov;
    if(data.date_delivery == 'NaN/NaN/NaN')
    data.date_delivery = this.demand.date_delivery;
    if(data.type == '')
    data.type = this.demand.type;
    
    const reader = new FileReader();
    
    if(this.selectedFile == undefined){
    this.demandService.getImage(this.demand.fileURL, this.demand.filename).subscribe(
      response => {
        console.log(response);
        this.selectedFile  = response;
      },
      error => {
        console.log(error);
      });
    }
    console.log(data);
    console.log(this.selectedFile.item(0) );

    
    this.demandService.update(data,this.selectedFile.item(0),this.demand.id).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
    
  }
  newDemand(): void {

    this.submitted = false;
    this.demande = {
      type: '',
      departGov:'',
      departAdr:'',
      arriGov:'',
      arriAdr:'',
      tel_receiver: '',
      remark: '',
      weight: '',
      height: '',
      length: '',
      image_uploads:'',
    };
    this.demande.type = '';
    this.demande.tel_receiver = '';
    this.demande.remark = '';
    this.demande.weight = '';
    this.demande.height = '';
    this.demande.length = '';
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
    
    if((this.selectedDay = event.target.value)=='env'){
      (document.getElementById("weight") as HTMLInputElement).disabled=true,
      (document.getElementById("length") as HTMLInputElement).disabled=true,
      (document.getElementById("height") as HTMLInputElement).disabled=true
 }
 else{

 
      (document.getElementById("weight") as HTMLInputElement).disabled=false,
      (document.getElementById("length") as HTMLInputElement).disabled=false,
      (document.getElementById("height") as HTMLInputElement).disabled=false
    
      }  }



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
  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]

  }

  onUpload() {
    this.http.post('my-backend.com/file-upload', this.selectedFile)
    .subscribe( 
      (      data: any) => {
      this.Governorates = data;
    });
  }

  selectFile(event:any): void {
    this.selectedFile = event.target.files;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target?.result;
      }
    }
  }

 
  selectDate(event:any): void {
    this.newDate = event.target.value;
    console.log(this.newDate);
  }

 

}





