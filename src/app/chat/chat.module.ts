import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { HttpModule } from '@angular/http';
import { DimantedeskService } from '../shared/rest-header.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [ChatDialogComponent],
  exports: [ ChatDialogComponent ],
  providers: [ChatService, DimantedeskService]
})
export class ChatModule { }
