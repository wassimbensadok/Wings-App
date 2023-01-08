import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wings-dashboard';
  currentRoute: boolean = true;
  constructor(private router: Router) {
  
    this.router.events.subscribe((event: Event) => {

        if (event instanceof NavigationEnd) {
          
              console.log(event);
              if( event.url === '/login'){
                console.log(true);
                this.currentRoute = true;
              }else{
                console.log(false);
                this.currentRoute = false;
              }
              
        }


    });

}

}
