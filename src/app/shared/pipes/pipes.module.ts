import { CustomPipesPipe } from './pipesCustom/custom-pipes.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipesCustom/truncate.pipe';
import { CalculateAgePipe } from './pipesCustom/calculate-age.pipe';
import { StringToFechPipe } from './pipesCustom/string-to-fech.pipe';

const IMPORTS = [
  CommonModule,
];

const EXPORTS = [
  CommonModule,
  CustomPipesPipe,
  TruncatePipe,
  CalculateAgePipe,
  StringToFechPipe
];

const DECLARATIONS = [
  CustomPipesPipe,
  TruncatePipe,
  CalculateAgePipe,
  StringToFechPipe
];

@NgModule({
  imports: IMPORTS,
  exports: EXPORTS,
  declarations: DECLARATIONS
})
export class PipesModule { }
