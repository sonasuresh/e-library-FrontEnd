import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books : [
   { id:"1"},
   { id:"2"}
  ]
  constructor() { }
  ngOnInit(): void {
  }

  addBook(){
    alert("addBook")
  }

  updateBook(){
    alert("update")
  }
}
