import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TreeModule } from './tree/tree.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './tree/shared/material/material.module';
import { NotNullPipe } from './not-null.pipe';


@NgModule({
  declarations: [
    AppComponent,
	NotNullPipe
  ],
  imports: [
    BrowserModule,
    TreeModule,
    MaterialModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
