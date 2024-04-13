import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, of } from "rxjs";//может быть использован для представления потока данных из различных источников

export interface Car {
    id: number;
    name: string;
    diesel: boolean;
    colour: [];
}

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private http: HttpClient) { }

    getCars(): Observable<Array<Car>> {
        return this.http.get<Array<Car>>('assets/data.json')
            .pipe(
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            )
    }
}

//Injectable используется для пометки класса, чтобы 
//Angular мог создать экземпляры этого класса и предоставить 
//его как зависимость другим классам.

//Как только класс помечен декоратором Injectable, 
//его можно внедрять в другие классы

// Этот код отлавливает ошибку при выполнении HTTP-запроса для получения данных о машинах. 
//В случае возникновения ошибки, код выведет сообщение об ошибке в консоль и вернет пустой массив вместо выброса исключения.