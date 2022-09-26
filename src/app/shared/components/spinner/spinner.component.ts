import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
// import { SpinnerService } from '@app/shared/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {

  /**
   * Injeccción del servicio del spinner
   */
  private spinnerService = inject(SpinnerService);

  /**
   * Proviedad loading para saber cuando está cargando
   */
  isLoading$ = this.spinnerService.isLoading$;

}
