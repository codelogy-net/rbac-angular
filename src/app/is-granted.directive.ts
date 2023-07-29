import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { RbacService } from './rbac.service';
import { User } from './types';

@Directive({
  selector: '[isGranted]'
})
export class IsGrantedDirective implements OnInit {
  private _rbacService = inject(RbacService);
  private _templateRef = inject(TemplateRef);
  private _viewContainer = inject(ViewContainerRef);
  private _user!: User;
  private _roleOrPermission!: string;

  @Input()
  set isGranted(roleOrPermission: string) {
    this._roleOrPermission = roleOrPermission;
  }

  @Input('isGrantedFor')
  set isGrantedFor(user: User) {
    this._user = user;
  };

  ngOnInit() {
    if (this._rbacService.isGranted(this._roleOrPermission, this._user)) {
      this._viewContainer.clear();
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  }
}
