import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-list-complaint',
  templateUrl: './list-complaint.component.html',
  styleUrls: ['./list-complaint.component.css']
})
export class ListComplaintComponent implements OnInit {

  currentUser: any;
  comments: any;
  currentDemand = null;
  currentIndex = -1;
  nom = '';
  comentaire = '';
  date = '';
  
  constructor( private aa : DashboardService,private token:TokenStorageService) { }
  
  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.retrieveadmin();
   
 
  }
  
  retrieveadmin(): void {
    this.aa.get(this.currentUser.id)
      .subscribe(
        data => {
          this.comments = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveadmin();
    this.currentDemand = null;
    this.currentIndex = -1;
  }

}