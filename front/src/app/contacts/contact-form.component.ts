import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

import { NgIf } from "@angular/common";
import { ContactService } from "./data-access/contact.service";
import { Contact } from "./data-access/contact.model";

import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-contact-form",
  templateUrl: "./contact-form.component.html",
  styleUrls: ["./contact-form.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    NgIf,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class ContactForm implements OnInit {
  @ViewChild('messageValue') messageValue!: ElementRef;
  @ViewChild("contactForm") contactForm!: NgForm;
  email: string = "";
  message: string = "";
  imputedSize: number = 0;
  maxLength: number = 299;
  private messageService = inject(MessageService);

  ngOnInit() {}

  constructor(private contactService: ContactService) {}

  ngAfterViewInit() {
    console.log(this.messageValue.nativeElement.value.length);
  }

  onTextareaInput(): void {
    this.imputedSize = this.messageValue.nativeElement.value.length;
  }

  onFormSubmit(): void {
    this.contactForm.control.markAllAsTouched();
    if (this.contactForm.valid) {
      let contact: Contact = {
        id: crypto.randomUUID(),
        email: this.email,
        message: this.message,
        date: new Date(),
      };

      this.contactService.onSendMessage(contact).subscribe((isSubmitted) => {
        if (isSubmitted) {
          this.messageService.add({
            life: 5000,
            severity: "success",
            detail: "Demande de contact envoyée avec succès",
          });
          this.resetForm();
        }
      });
    }
  }

  private resetForm(): void {
    this.contactForm.resetForm();
    this.imputedSize = 0;
  }
}
