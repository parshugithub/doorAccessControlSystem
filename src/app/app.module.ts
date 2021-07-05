
import { LoginComponent } from './login/login.component';
import { RegistrationService } from './service/registration.service';
import { AuthGuard } from './guards/auth.guard';
import { PaginationPipePipe } from './pagination-pipe.pipe';
 import { UsersManagementComponent } from './users-management/users-management.component';
 import { CreateUserComponent } from './users-management/create-user/create-user.component';
 import { EditUserComponent } from './users-management/edit-user/edit-user.component';
 import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
 import { AllcustomerComponent } from './engineer-dashboard/allcustomer/allcustomer.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http' 

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { EditSiteComponent } from './dashboard/edit-site/edit-site.component';
import { DatepickerModule, BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as $ from 'jquery';

import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';

import { ViewSiteInfoComponent } from './dashboard/view-site-info/view-site-info.component';
import { NotificationComponent } from './notification/notification.component';
import { BackgroundTaskComponent } from './background-task/background-task.component';
import { ChangePasswordComponent } from './users-management/change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';
import { ForgotPasswordComponent } from './users-management/forgot-password/forgot-password.component';
import { ResendEmailComponent } from './users-management/resend-email/resend-email.component';
import { CreateSiteComponent } from './dashboard/create-site/create-site.component';
import { DetailEventLogForSiteComponent } from './dashboard/event-log-for-site/detail-event-log-for-site/detail-event-log-for-site.component';
import { EventLogForSiteComponent } from './dashboard/event-log-for-site/event-log-for-site.component';
import { GateWayComponent } from './dashboard/gate-way/gate-way.component';
import { RemoteEventLogForSiteComponent } from './dashboard/remote-event-log-for-site/remote-event-log-for-site.component';
import { OpenDoorComponent } from './dashboard/open-door/open-door.component';
import { CreateDoorGroupComponent } from './dashboard/open-door/create-door-group/create-door-group.component';
import { EditDoorGroupComponent } from './dashboard/open-door/edit-door-group/edit-door-group.component';
import { DoorDescriptionComponent } from './dashboard/door-description/door-description.component';
import { VoiceOperatorComponent } from './dashboard/voice-operator/voice-operator.component';
import { PersonManagementComponent } from './dashboard/person-management/person-management.component';
import { CreatePersonComponent } from './dashboard/person-management/create-person/create-person.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { MoveToSiteComponent } from './dashboard/move-to-site/move-to-site.component';
import { VoiceOperatorsSiteComponent } from './users-management/voice-operators-site/voice-operators-site.component';
import { EditPersonComponent } from './dashboard/person-management/edit-person/edit-person.component';
import { UpdatePersonComponent } from './dashboard/person-management/update-person/update-person.component';
import { PoweronresetComponent } from './engineer-dashboard/poweronreset/poweronreset.component';
import { FireinputComponent } from './engineer-dashboard/fireinput/fireinput.component';
import { LockdownComponent } from './engineer-dashboard/lockdown/lockdown.component';
import { LossofcanComponent } from './engineer-dashboard/lossofcan/lossofcan.component'

import { SitedashboardComponent } from './engineer-dashboard/sitedashboard/sitedashboard.component';
import { VoiceOperatorDashboardComponent } from './voice-operator-dashboard/voice-operator-dashboard.component';
import { CreatesiteComponent } from './engineer-dashboard/createsite/createsite.component';
import { CreateEngineerComponent } from './engineer-dashboard/create-engineer/create-engineer.component';
import { EditEngineerComponent } from './engineer-dashboard/edit-engineer/edit-engineer.component';
import { EngineerDashboardComponent } from './engineer-dashboard/engineer-dashboard.component';
import { EditCustomerComponent } from './engineer-dashboard/edit-customer/edit-customer.component';
import { EngineerLoginComponent } from './engineer-login/engineer-login.component';
import { PersonInSiteManagementComponent } from './dashboard/person-in-site-management/person-in-site-management.component';
import {CreatePersonInSiteComponent} from './dashboard/person-in-site-management/create-person-in-site/create-person-in-site.component';
import { UpdatePersonInSiteComponent } from './dashboard/person-in-site-management/update-person-in-site/update-person-in-site.component';
import { DoorManagementComponent } from './dashboard/door-management/door-management.component';
import { EditDoorManagementGroupComponent } from './dashboard/door-management/edit-doorgroup/edit-doorgroup.component';
import { EditPersonInSiteComponent } from './dashboard/person-in-site-management/edit-person-in-site/edit-person-in-site.component';
import { CreateDoorComponent } from './dashboard/door-management/create-door/create-door.component';
import { CreateDoorManagementGroupComponent } from './dashboard/door-management/create-doorgroup/create-doorgroup.component';
import { EditDoorComponent } from './dashboard/door-management/edit-door/edit-door.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,AllcustomerComponent,PoweronresetComponent,FireinputComponent,
    SidebarComponent,EditSiteComponent,ViewSiteInfoComponent,UsersManagementComponent,CreateUserComponent,
    TodoListComponent,EditUserComponent, ChangePasswordComponent,LockdownComponent,
    ForgotPasswordComponent,LossofcanComponent,SitedashboardComponent,
    ResendEmailComponent,
    SettingsComponent,
    StaffmanagementComponent,
    EditPersonInSiteComponent,
    TodoComponent,
    LoginComponent,
    DashboardComponent,
    PaginationPipePipe,
    NotificationComponent,
    BackgroundTaskComponent,
    CreateSiteComponent,
    CreatesiteComponent,
    GateWayComponent,
    EngineerDashboardComponent,
    EventLogForSiteComponent,
    RemoteEventLogForSiteComponent,
    DetailEventLogForSiteComponent,
    OpenDoorComponent,
    CreateDoorManagementGroupComponent,
    EditDoorGroupComponent,
    DoorDescriptionComponent,
    VoiceOperatorComponent,
    PersonManagementComponent,
    CreatePersonComponent,
    MoveToSiteComponent,
    VoiceOperatorsSiteComponent,
    EditPersonComponent,
    UpdatePersonComponent,
    VoiceOperatorDashboardComponent,
    CreateEngineerComponent,
    EditEngineerComponent,
    EditCustomerComponent,
    EngineerLoginComponent,
    PersonInSiteManagementComponent,
    CreatePersonInSiteComponent,
    UpdatePersonInSiteComponent,
    DoorManagementComponent,
    CreateDoorGroupComponent,
    EditDoorManagementGroupComponent,
    CreateDoorComponent,
    EditDoorComponent,
  ],
  imports: [
    BrowserModule,Ng2SearchPipeModule,ColorPickerModule,
    AppRoutingModule,HttpClientModule,ToastrModule.forRoot(),BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),PaginationModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
     FormsModule,
    ReactiveFormsModule,
    ChartsModule,

   // NgForm,
    
  ],
  providers: [ThemeService,DatePipe,NgbActiveModal,RegistrationService,AuthGuard,NgbActiveModal,
    // ConfirmDialogService,
     BsDatepickerConfig, 
    BsDropdownConfig,
    PaginationConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
