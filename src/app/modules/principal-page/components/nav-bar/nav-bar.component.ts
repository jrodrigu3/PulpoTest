import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  navBar = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  public share(): void {
    const { value } = this.navBar;
    if (!!value) {
      console.log(this.navBar.value);
    }
  }

}
