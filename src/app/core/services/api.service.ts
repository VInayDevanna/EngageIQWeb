import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { delay, finalize, Observable, Subject } from "rxjs";
//import { Store } from "@ngrx/store";
import { environment } from "../../../environments/environment";
//import { hideLoading, showLoading } from "../../store/global-loading.actions";

@Injectable({
  providedIn: "root",
})
export class ApiService {

  private http = inject(HttpClient);
  //private store= inject(Store<{globalLoading: boolean}>);
   private baseUrl = `${environment.apiUrl}`;
   callApi<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    let apiCall: Observable<T>;
  
    switch (method) {
      case 'GET':
        apiCall = this.http.get<T>(`${this.baseUrl}${url}`, { headers, params });
        break;
      case 'POST':
        apiCall = this.http.post<T>(`${this.baseUrl}${url}`, data, { headers, params });
        break;
      case 'PUT':
        apiCall = this.http.put<T>(`${this.baseUrl}${url}`, data, { headers, params });
        break;
      case 'DELETE':
        apiCall = this.http.delete<T>(`${this.baseUrl}${url}`, { headers, params });
        break;
      default:
        throw new Error(`Unsupported request method: ${method}`);
    }
  
    return apiCall.pipe(
      // Handle loading states if needed
       //delay(100), 
     // finalize(() => this.store.dispatch(hideLoading())) // Finalize ensures this runs on both success and failure
    );
  }
}



