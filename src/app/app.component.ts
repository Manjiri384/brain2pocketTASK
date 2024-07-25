import { Component } from '@angular/core';
//import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  taskData:any=[];
  text1="";
  text2="";
  text3="";

  Submit(){
    this.taskData.push({brandName:this.text1, company:this.text2, quntity:this.text3});
    console.log(this.taskData);
    alert(this.taskData)
    this.text1='';
    this.text2='';
    this.text3='';
  }

  delete(item:any){
    alert("index"+item);
  }
}
