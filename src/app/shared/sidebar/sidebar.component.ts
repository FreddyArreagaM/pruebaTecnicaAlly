import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isDashboardDropdownOpen = false;
  sidebarToggled: boolean = true;
  constructor() {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  ngOnInit(): void {
    this.checkScreenWidth();
  }

  private checkScreenWidth(): void {
    if (window.innerWidth <= 768) {
      this.sidebarToggled = false;
    } else {
      this.sidebarToggled = true;
    }
  }

  toggleDashboardDropdown(event: Event): void {
    event.preventDefault();
    this.isDashboardDropdownOpen = !this.isDashboardDropdownOpen;
  }

  toggleSidebar() {
    this.sidebarToggled = !this.sidebarToggled;
  }
}
