import { Component, inject, linkedSignal, signal, WritableSignal } from '@angular/core';
import { LabelComponent } from "./label/label.component";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CepService } from './cep/cep.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMaskDirective } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatFormFieldModule,
    LabelComponent,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private cepService = inject(CepService);

  readonly search = signal("");
  readonly cepData = this.cepService.data;
  
  readonly city: WritableSignal<string> = linkedSignal({
    source: () => this.cepData.value()?.localidade,
    computation: (newValue, old) => newValue || old?.source || "",
  });

  changeCep() {
    this.cepService.cep.set(this.search() as any as number);
  }
}
