import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from "../../models/menu-item.model";
import { AuthService } from "../../../pages/auth/services/auth.service";
import { Subscription } from "rxjs";
import { UserModel } from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private menuItems: MenuItem[] = [
    {
      label: 'Matches',
      icon: 'favorite_border',
      routeLink: '/auth/login',
      requiredAuth: true
    },
    {
      label: 'Lists',
      icon: 'list_alt',
      routeLink: '/auth',
      requiredAuth: true
    },
    {
      label: 'Messages',
      icon: 'chat_bubble_outline',
      routeLink: '/auth',
      requiredAuth: true
    },
    {
      label: 'Logout',
      icon: 'logout',
      routeLink: '/auth',
      requiredAuth: true
    },
    {
      label: 'Auth',
      icon: 'how_to_reg',
      routeLink: '/auth/login',
      requiredAuth: false
    },

  ];
  private userSubscription: Subscription = new Subscription()
  user: UserModel | null = null

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.user = user
    })
  }

  onMenuItemClick(label: string) {
    switch (label) {
      case "Logout":
        this.authService.logout()
    }
  }

  getFilteredMenuItems(): MenuItem[] {
    return this.menuItems.filter(item => item.requiredAuth == !!this.user)
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

}
