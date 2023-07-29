import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RbacService } from './rbac.service';
import { Roles } from './types';

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(RbacService).isGranted(Roles.ADMINISTRATOR);
};
