import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundTaskComponent } from './background-task/background-task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditSiteComponent } from './dashboard/edit-site/edit-site.component';
import { ViewSiteInfoComponent } from './dashboard/view-site-info/view-site-info.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { UsersManagementComponent } from './users-management/users-management.component';
import { CreateUserComponent } from './users-management/create-user/create-user.component';
import { EditUserComponent } from './users-management/edit-user/edit-user.component';
import { ForgotPasswordComponent } from './users-management/forgot-password/forgot-password.component';
import { SettingsComponent } from './settings/settings.component';
import { StaffmanagementComponent } from './staffmanagement/staffmanagement.component';
import { ChangePasswordComponent } from './users-management/change-password/change-password.component';
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
import { MoveToSiteComponent } from './dashboard/move-to-site/move-to-site.component';
import { UpdatePersonComponent } from './dashboard/person-management/update-person/update-person.component';
import { EditPersonComponent } from './dashboard/person-management/edit-person/edit-person.component';
import { EngineerDashboardComponent } from './engineer-dashboard/engineer-dashboard.component';
import { PoweronresetComponent } from './engineer-dashboard/poweronreset/poweronreset.component';
import { LockdownComponent } from './engineer-dashboard/lockdown/lockdown.component';
import { LossofcanComponent } from './engineer-dashboard/lossofcan/lossofcan.component';
import { FireinputComponent } from './engineer-dashboard/fireinput/fireinput.component';
import { CreatecustomerComponent } from './engineer-dashboard/createcustomer/createcustomer.component';
import { AllcustomerComponent } from './engineer-dashboard/allcustomer/allcustomer.component';
import { CreatesiteComponent } from './engineer-dashboard/createsite/createsite.component';
import { VoiceOperatorDashboardComponent } from './voice-operator-dashboard/voice-operator-dashboard.component';
import { VoiceOperatorsSiteComponent } from './users-management/voice-operators-site/voice-operators-site.component';
import { SitedashboardComponent } from './engineer-dashboard/sitedashboard/sitedashboard.component';
import { CreateEngineerComponent } from './engineer-dashboard/create-engineer/create-engineer.component';
import { EditEngineerComponent } from './engineer-dashboard/edit-engineer/edit-engineer.component';
import { EditCustomerComponent } from './engineer-dashboard/edit-customer/edit-customer.component';
import { EngineerLoginComponent } from './engineer-login/engineer-login.component';
import { PersonInSiteManagementComponent } from './dashboard/person-in-site-management/person-in-site-management.component';
import { CreatePersonInSiteComponent } from './dashboard/person-in-site-management/create-person-in-site/create-person-in-site.component';
import { UpdatePersonInSiteComponent } from './dashboard/person-in-site-management/update-person-in-site/update-person-in-site.component';
import {DoorManagementComponent} from './dashboard/door-management/door-management.component';
import { CreateDoorManagementGroupComponent } from './dashboard/door-management/create-doorgroup/create-doorgroup.component';
import { EditDoorManagementGroupComponent } from './dashboard/door-management/edit-doorgroup/edit-doorgroup.component';
import { EditPersonInSiteComponent } from './dashboard/person-in-site-management/edit-person-in-site/edit-person-in-site.component';
import { CreateDoorComponent } from './dashboard/door-management/create-door/create-door.component';
import { EditDoorComponent } from './dashboard/door-management/edit-door/edit-door.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard/createsite', component: CreateSiteComponent,canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/updateSite/:sitename', component: EditSiteComponent,
  },
  {
    path: 'dashboard/view-site/:sitename', component: ViewSiteInfoComponent,
  },
  {
    path: 'usersmanagement', component: UsersManagementComponent, canActivate: [AuthGuard]
  },
  {
    path: 'usersmanagement/voice-operators-site/:userName', component: VoiceOperatorsSiteComponent, canActivate: [AuthGuard]
  },
  {
    path: 'usermanagemet/createuser', component: CreateUserComponent,canActivate: [AuthGuard],
  },
  {
    path: 'usermanagemet/updateUser/:username', component: EditUserComponent,canActivate: [AuthGuard],
  },
  {
    path:'person-management',component:PersonInSiteManagementComponent,canActivate:[AuthGuard]
  },
  {
    path:'person-management/create',component:CreatePersonInSiteComponent,canActivate:[AuthGuard]
  },
  {
    path:'person-management/edit-person/:personid',component:EditPersonInSiteComponent,canActivate:[AuthGuard]
  },
  {
    path:'person-management/update',component:UpdatePersonInSiteComponent,canActivate:[AuthGuard]
  },
  {
    path:'door-management',component:DoorManagementComponent,canActivate:[AuthGuard]
  },
  {
    path:'door-management/create-doorgroup',component:CreateDoorManagementGroupComponent,canActivate:[AuthGuard]
  },
  {
    path:'door-management/create-door',component:CreateDoorComponent,canActivate:[AuthGuard]
  },
   {
    path:'door-management/edit-door/:doorid',component:EditDoorComponent,canActivate:[AuthGuard]
  },
  {
    path:'door-management/edit',component:EditDoorManagementGroupComponent,canActivate:[AuthGuard]
  },
  {
    path: 'dashboard/Site/:siteid', component: MoveToSiteComponent, canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent,
  },
  {
    path: 'change-password', component: ChangePasswordComponent,
  },
  {
    path: 'resend-link', component: ResendEmailComponent,
  },
  {
    path: 'staffmanagement', component: StaffmanagementComponent, canActivate: [AuthGuard],
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'background-task', component: BackgroundTaskComponent, canActivate: [AuthGuard],
  },
  {
    path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard],
  },

  {
    path: 'voice-operator-dashboard', component: VoiceOperatorDashboardComponent, canActivate: [AuthGuard],
  },
  {
    path: 'communications', component: VoiceOperatorDashboardComponent, canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/gateway/:siteid/:deviceId/:siteName', component: GateWayComponent,canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/remote-eventlog/:siteid', component: RemoteEventLogForSiteComponent,canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/eventlog-filter/:siteid', component: EventLogForSiteComponent,canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/detailed-eventlog-filter/:siteid/:id', component: DetailEventLogForSiteComponent,canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/openDoor/:siteid', component: OpenDoorComponent, canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/openDoor/createdoorgroup/:siteid', component: CreateDoorGroupComponent,canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/openDoor/editdoorgroup/:doorgroupid', component: EditDoorGroupComponent,canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/doorDescription/:siteid', component: DoorDescriptionComponent, canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/VoiceOperators/:siteid', component: VoiceOperatorComponent, canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/persons/:siteid', component:PersonManagementComponent,canActivate: [AuthGuard]
  },
  {

    path: 'dashboard/persons/create/:siteid', component:CreatePersonComponent,canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/persons/upadate/:siteid', component:UpdatePersonComponent,canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/persons/updatePerson/:personid', component: EditPersonComponent,canActivate: [AuthGuard]
  },
{
    path:'door-management',component:DoorManagementComponent,canActivate:[AuthGuard]
  },
  {
    path:'door-management/create',component:CreateDoorManagementGroupComponent,canActivate:[AuthGuard]
  },
  {
    path: 'door-management/:siteid', component: DoorManagementComponent, canActivate: [AuthGuard],
  },
  {
    path: 'door-management/create/:siteid', component: CreateDoorManagementGroupComponent,canActivate: [AuthGuard],
  },
  {
    path: 'door-management/edit/:doorgroupid', component: EditDoorManagementGroupComponent,canActivate: [AuthGuard],
  },
  {
    path: 'engineer-dashboard', component: EngineerDashboardComponent,canActivate: [AuthGuard]
  },
  {
    path: 'engineer-dashboard/create-engineer', component: CreateEngineerComponent
  }, 
  {
    path: 'engineer-dashboard/edit-engineer/:engID', component: EditEngineerComponent,canActivate: [AuthGuard]
  },
  {
    path: 'poweronreset/:siteid', component: PoweronresetComponent,canActivate: [AuthGuard]
  },{
    path: 'lockdown/:siteid', component: LockdownComponent,canActivate: [AuthGuard]
  },
  {
    path: 'lossofcan/:siteid', component: LossofcanComponent,canActivate: [AuthGuard]
  },
  {
    path: 'fireinput/:siteid', component: FireinputComponent,canActivate: [AuthGuard]
  },
  
  {
    path: 'createcustomer/:engID', component: CreatecustomerComponent,canActivate: [AuthGuard]
  },
  {
    path: 'allCustomers/:engID', component: AllcustomerComponent,canActivate: [AuthGuard]
  },
   
  {
    path: 'edit-customer/:custID', component: EditCustomerComponent,canActivate: [AuthGuard]
  },
  {
    path: 'addsite/:custID', component: CreatesiteComponent,canActivate: [AuthGuard]
  },
  {
    path: 'sitedashboard/:custID', component: SitedashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'engineer-login', component: EngineerLoginComponent
  },
  {
    path: 'login', component: LoginComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
