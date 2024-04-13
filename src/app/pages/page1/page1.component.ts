import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { DataService, Car } from 'src/app/core/services/data.service';

export class User {
  constructor(public name: string, public age: number, public surname: string) {

  }
}
@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  users: User[] = [];
  cars: Car[] = [];

  name = '';
  surname = '';
  age = 0;

  constructor(private dataService: DataService) {
    
  }

  ngOnInit(): void {
      this.dataService.getCars()
      .pipe(
        filter(data => data != null),
        map((data => (data.map(car => ({...car})))))
      )
      .subscribe((cars) => {
          this.cars = cars;
      })

  }


  addUser() {
    this.users.push(new User(this.name, this.age, this.surname));
    this.name = '';
    this.surname = '';
    this.age = 0;
  }

  onNameChange(): void {
    console.log('Что-то изменилось в поле ' + this.name)
  }
}
