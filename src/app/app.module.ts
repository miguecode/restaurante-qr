import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutModule } from './main-layout/main-layout.module';

// Importa los módulos de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MainLayoutModule,
    provideFirebaseApp(() => initializeApp({
      apiKey: 'AIzaSyCbmJtNjO_rja_MwiIcZb58x1ijvz0087o',
      authDomain: 'pps-segundo-parcial-95514.firebaseapp.com',
      projectId: 'pps-segundo-parcial-95514',
      storageBucket: 'pps-segundo-parcial-95514.appspot.com',
      messagingSenderId: '800945683480',
      appId: '1:800945683480:android:ff123b19a84933f3b4576d'
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }