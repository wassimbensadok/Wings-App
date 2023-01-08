import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { TokenStorageService } from 'src/app/Services/token.service';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  admin = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    tel: '',
    typee:''
  };
  role: Array<string> | undefined 
  types: boolean = false;
  typess: number = 0;
  submitted: boolean = false;

  private notifier: NotifierService;

  constructor(private aa: DashboardService,notifier: NotifierService, private token : TokenStorageService) { 
    this.notifier = notifier;
  }

  ngOnInit() {
    console.log(this.token.getUser());

  }
  type(event: any) {
    if (this.types = ((<HTMLInputElement>document.getElementById("inlineRadio1")).checked)) { 
      
      this.role =  ['ROLE_ADMIN'];}
    else { 
      this.role =  ['ROLE_AGENT'];
    }
  }

  public showNotification( type: string, message: string ): void {
		this.notifier.notify( type, message );
	}
  ajout(): void {
    this.notifier.notify('success', 'You are awesome! I mean it!');
   
    const data = {
      lastname: this.admin.nom,
      firstname: this.admin.prenom,
      email: this.admin.email,
      phone: this.admin.tel,
      role: this.role,
      password: this.admin.password

    };
    console.log(data);
    this.aa.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.notifier.notify( 'success', 'Notification successfully opened.' );
        },
        error => {
          console.log(error);
        });

  }
}
