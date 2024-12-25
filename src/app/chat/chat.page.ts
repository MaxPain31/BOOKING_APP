import { Component, OnInit } from '@angular/core';


interface Message {
  text: string;
  sent: boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  constructor() { }

  ngOnInit() {
  }

}
