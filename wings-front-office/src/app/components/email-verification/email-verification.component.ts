import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  code: string ='';
  email:string ='' ;
  msg : any;
  constructor(private route: ActivatedRoute,private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        console.log('Got the Code as: ', params['email'], params['code']);
        this.email =  params['email'];
        this.code =  params['code'];
      }
    )
    this.EmailVerification();
  }

  EmailVerification(): void {
    
    this.authService.Verficiation(this.email, this.code).subscribe({
      next: data => {
        console.log(data);
        this.msg = data;
      },
      error: err => {
        console.log("this erreur: ", err)
      }
    });
  }

}
