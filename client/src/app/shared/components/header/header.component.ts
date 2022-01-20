import { Component, OnInit } from '@angular/core';
import { MenuItem } from "../../models/menu-item.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Matches',
      icon: 'favorite_border',
      routeLink: '/auth/login'
    },
    {
      label: 'Lists',
      icon: 'list_alt',
      routeLink: '/auth'
    },
    {
      label: 'Messages',
      icon: 'chat_bubble_outline',
      routeLink: '/auth'
    },
    {
      label: 'Auth',
      icon: 'how_to_reg',
      routeLink: '/auth/login'
    },

  ];


  constructor() {
  }

  ngOnInit(): void {
  }

}
