import { Component, OnInit } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faShuffle } from '@fortawesome/pro-light-svg-icons';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'm-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    faBars = faBars;
    faTimes = faTimes;
    faShuffle  = faShuffle;

    isScrolling = false;

    showMobileMenu = false;
    constructor(
        public layoutService: LayoutService,
    ) { }

    ngOnInit() {
        window.addEventListener('scroll', this.scroll, true)
    }

    scroll = (): void => {

        let scrollHeigth;
     
        if(window.innerWidth < 350){
         scrollHeigth = 30;
        }else if(window.innerWidth < 500 && window.innerWidth > 350){
         scrollHeigth = 40;
        }else if(window.innerWidth < 700 && window.innerWidth > 500){
         scrollHeigth = 50;
        }else if(window.innerWidth < 1000 && window.innerWidth > 700){
         scrollHeigth = 100;
        }else{
          scrollHeigth = 110;
        }
        console.log(scrollY);
        console.log(scrollHeigth);
         if(window.scrollY >= scrollHeigth){
            this.isScrolling = true;
            document.body.style.setProperty('--navbar-scroll', "white");
            document.body.style.setProperty('--navbar-scroll-text', "black");
            document.body.style.setProperty('--navbar-scroll-shadow', "0px 6px 12px -5px #000000");
         }else if(window.scrollY < scrollHeigth){
            this.isScrolling = false;
            document.body.style.setProperty('--navbar-scroll', "transparent");
            document.body.style.setProperty('--navbar-scroll-text', "white");
            document.body.style.setProperty('--navbar-scroll-shadow', "none");
         }
    }
    
    onClick(){
        this.showMobileMenu = true;
        document.body.style.setProperty('--navbar-scroll-text', "black");
    }


}
