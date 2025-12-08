import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";

export abstract class GenericService<T> {

    constructor(
        protected http: HttpClient,
        protected path: string
    ) {

    }

    findAll(): Observable<T[]> {
        return this.http.get<T[]>(environment.BACKEND_URL + this.path)
    }

    findById(id: number): Observable<T> {
        return this.http.get<T>(`${environment.BACKEND_URL}${this.path}/${id}`)
    }

    save(obj: T): Observable<T> {
        return this.http.post<T>(environment.BACKEND_URL + this.path, obj)
    }

    update(id: number, obj: T): Observable<T> {
        return this.http.put<T>(`${environment.BACKEND_URL}${this.path}/${id}`, obj)
    }

    remove(id: number) {
        return this.http.delete<void>(`${environment.BACKEND_URL}${this.path}/${id}`)
    }
}