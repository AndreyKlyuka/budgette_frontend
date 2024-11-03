import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent {

}
