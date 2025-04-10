import { Routes } from "@angular/router";
import { ContactForm } from "./contact-form.component";

export const CONTACTS_ROUTES: Routes = [
  {
    path: "form",
    component: ContactForm,
  },
  { path: "**", redirectTo: "form" },
];
