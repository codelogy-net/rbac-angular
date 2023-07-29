import { Injectable } from '@angular/core';
import { Role, User } from './types';

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  private _roles = new Map();
  private _authenticatedUser!: User;

  /**
   * For each role find its parent roles and make a flat array
   * @param roles
   */
  setRoles(roles: Role[]) {
    for (const role of roles) {
      this._roles.set(role.uid, this._flatten(role, roles));
    }
  }

  /**
   * If the server returned an authenticated user,
   * then by default we will check it for access rights
   * @param user
   */
  setAuthenticatedUser(user: User) {
    this._authenticatedUser = user;
  }

  /**
   *
   * @param roleOrPermission
   * @param user
   */
  isGranted(roleOrPermission: string, user?: User): boolean {
    // if no special user is passed for checking,
    // we check the authenticated user.
    if (!user) {
      user = this._authenticatedUser;
    }

    if (!user) {
      return false;
    }

    if (!this._roles.has(user.role.uid)) {
      return false;
    }

    return this._roles.get(user.role.uid).includes(roleOrPermission);
  }

  /**
   * Make a flat array of parent roles for quick search
   * @param forRole
   * @param allRoles
   * @private
   */
  private _flatten(forRole: Role, allRoles: Role[]): string[] {
    let results: string[] = [forRole.uid];

    for (const role of allRoles) {
      if (forRole.extends === role.id) {
        const parentRole = allRoles.find(r => r.id === forRole.extends);

        if (parentRole) {
          results = [...results, ...this._flatten(parentRole, allRoles)];
        }
      }
    }

    return results;
  }
}
