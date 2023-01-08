import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_service/token-storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  currentUser:any;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
     
    this.currentUser = this.token.getUser();
    this.loadJsFile("assets/js/dropdown.js");
  }

  public loadJsFile(url: string) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

}
