import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightsComponent } from './lights/lights.component';



@NgModule({
  declarations: [
    LightsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LightsComponent
  ]
})
export class SharedModule { }
