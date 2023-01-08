import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   
    this.loadJsFile("assets/libs/apexcharts/apexcharts.min.js");
    this.loadJsFile("assets/js/pages/saas-dashboard.init.js");
    this.loadJsFile("assets/js/app.js");

  }

  public loadJsFile(url :string){
    let node = document.createElement('script');
    node.src=url;
    node.type='text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  public loadCssFile(url :string){
    let node = document.createElement('link');
    node.href = url;
    node.type='text/css';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
