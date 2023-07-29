import { Component, inject, OnInit } from '@angular/core';
import { RbacService } from './rbac.service';
import { Roles } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  readonly rbacService = inject(RbacService);

  customUser = {
    id: 1,
    name: 'Custom User',
    role: {
      id: 3,
      name: 'User',
      uid: 'USER'
    }
  };

  constructor() {
    // Assuming the roles and authenticated came from the server
    this.rbacService.setRoles([
      {
        id: 1,
        name: 'User',
        uid: 'USER',
        extends: null
      },
      {
        id: 2,
        name: 'Staff',
        uid: 'STAFF',
        extends: 1
      },
      {
        id: 3,
        name: 'Administrator',
        uid: 'ADMINISTRATOR',
        extends: 2
      }
    ]);
    this.rbacService.setAuthenticatedUser({
      id: 1,
      name: 'User',
      role: {
        id: 2,
        name: 'Administrator',
        uid: 'STAFF',
        extends: 1
      }
    });
  }

  ngOnInit() {
    if (this.rbacService.isGranted(Roles.ADMINISTRATOR)) {
      console.log('User can access as an administrator member!');
    } else {
      console.log('User cannot access as an administrator member!');
    }

    if (this.rbacService.isGranted(Roles.STAFF)) {
      console.log('User can access as an staff member!');
    } else {
      console.log('User cannot access as an staff member!');
    }

    if (this.rbacService.isGranted(Roles.USER)) {
      console.log('User can access as an user member!');
    } else {
      console.log('User cannot access as an user member!');
    }
  }
}
