import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticketing-torangto-angular';

 data = this.fb.group({
    inputs:this.fb.array([])
 });
constructor(private fb: FormBuilder){}

get inputs(){
  return this.data.get('inputs') as FormArray;
}

  onAdd(){
    this.inputs.push(this.fb.control(''));
  }

  remove(i:number){
    this.inputs.removeAt(i);
  }
}
