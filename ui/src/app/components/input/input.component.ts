import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Settings, defaultSettings } from './input';


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  /**
   * Input variable  holding the settings for custom input component
   */
  @Input()
  settings: Settings = defaultSettings

  /**
   * Output variable  emiting the values for the value change
   */
  @Output()
  valueChange = new EventEmitter<string>();

  /**
   * Input variable  holding the formControl instance
   */
  @Input()
  control: FormControl = new FormControl('');

  get value(): string {
    return this.control.value;
  }

  set value(val: string) {
    this.control.setValue(val);
    this.valueChange.emit(val);
  }
}
