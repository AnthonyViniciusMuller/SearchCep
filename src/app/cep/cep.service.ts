import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

interface CepData {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable({
  providedIn: 'root'
})
export class CepService {
  readonly cep = signal<number | null>(null);
  readonly data = httpResource<CepData>(() => this.cep() ? `https://viacep.com.br/ws/${this.cep()}/json` : undefined);
}
