import { Component, HostListener, OnInit } from '@angular/core';
import { DemandService } from 'src/app/_service/demand.service';
import { OfferService } from 'src/app/_service/offer.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-list-offer',
  templateUrl: './all-list-offer.component.html',
  styleUrls: ['./all-list-offer.component.css']
})
export class AllListOfferComponent implements OnInit {
  demands: any;
  currentUser: any;
  offers: any;
  currentDemand: any;
  currentOffer: any;
  currentIndex = -1;
  type = '';
  tel_receiver = '';
  destination = '';
  etatdemand = '';
  colis: boolean = false;
  envolope: boolean = false;
  express: boolean = false;
  normal: boolean = false;
  ready: boolean = false;
  deliveryId: any;
  constructor(private token: TokenStorageService, private offerSercice: OfferService, private demandService: DemandService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.loadJsFile("assets/js/dropdown.js");
    this.retrieveDemand();
  }

  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  retrieveDemand(): void {
    this.offerSercice.getOffer()
      .subscribe(
        data => {
          this.offers = data;

          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  ok(): void {

  }





  // When the user clicks the button, open the modal 
  open(id: any, deliveryId: any): void {
    this.currentOffer = id;
    this.deliveryId = deliveryId;
    this.demandService.get(this.currentUser.id)
      .subscribe(
        data => {
          this.demands = data;
          console.log(this.demands);
        },
        error => {
          console.log(error);
        });
    (document.getElementById("myModal") as HTMLInputElement).style.display = "block";
  }

  close(): void {
    (document.getElementById("myModal") as HTMLInputElement).style.display = "none";
  }

  send(id: any): void {
    this.currentDemand = id;
    console.log(this.currentOffer);
    console.log(this.currentDemand);
    console.log(this.currentUser.id);
    console.log(this.deliveryId);
    const data = {
      userId: this.currentUser.id,
      deliveryId: this.deliveryId,
      offerId: this.currentOffer,
      demandId: this.currentDemand
    };
    this.offerSercice.sendInvitation(data).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Bien',
          text: 'votre demande de livraison est envoyée !',
        })
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Bien',
          text: "votre demande de livraison n'est pas envoyée",
        })
      });

  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (event.target == document.getElementById("myModal")) {
      (document.getElementById("myModal") as HTMLInputElement).style.display = "none";
    }
  }


}

