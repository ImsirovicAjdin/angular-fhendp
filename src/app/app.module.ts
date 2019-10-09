// When we subscribe to an Observable, we get a subscription object in return
// An observable unsubscribe after getting 5 values from 1–10 numbers


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { 

  // Build an Observable
  observable = Observable.create( (observer:any) => {
    let val = 0;
    setInterval( () => {
      observer.next(++val)
      if(val === 10) {
        observer.complete()
      }
    }, 1000)
  });

  // Build an observer
  observer = {
    next: (val:number) => console.log(val),
    error: (err:TypeError) => console.log(err),
    complete: () => console.log('No more data in stream')
  }

  // Subscribing the observable to get the data from the data stream
  subscription = this.observable.subscribe(this.observer);

  constructor() {
    // Unsubscribe the observable after getting 5 values
    setTimeout(() => {this.subscription.unsubscribe()}, 5000)
  }

}
// Output : 
// 1
// 2
// 3
// 4
// 5