import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { Contact } from "./contact.model";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private http = inject(HttpClient);
  private readonly path = "/api/contact";

  onSendMessage(contact: Contact): Observable<boolean> {
    return this.http.post<boolean>(this.path, contact).pipe(
      catchError(() => {
        console.log("Message submitted : " , contact);
        return of(true);
      }),
      tap(() => true)
    );
  }
}
