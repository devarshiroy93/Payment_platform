import { Component, Input } from '@angular/core';
import { AlertSettings, DefaultAlertSettings } from './alert';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  /**
   * settings input for alert component
   */
  @Input()
  settings :AlertSettings |  null= DefaultAlertSettings;

  
}
