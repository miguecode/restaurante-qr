import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonContent,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Chat } from 'src/app/classes/chat';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-listado-chat',
  templateUrl: './listado-chat.component.html',
  styleUrls: ['./listado-chat.component.scss'],
  standalone: true,
  imports: [
    IonToolbar,
    IonTitle,
    IonContent,
    IonHeader,
    CapitalizePipe,
    NgFor,
    NgIf,
    RouterLink,
  ],
})
export class ListadoChatComponent implements OnInit {
  public lista: Chat[] = [];

  constructor(private chatService: ChatService, private router: Router) {}

  ngOnInit() {
    this.chatService.traerTodosObservable().subscribe((l) => {
      this.lista = l.sort((a, b) => a.id - b.id);
    });
  }

  mozoToChatMozo(chat: Chat) {
    this.router.navigateByUrl(`/chat-mozo/${chat.idCliente}`);
  }
}
