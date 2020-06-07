import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: Array<any> = []
  constructor(private  router:Router,private bookService:BookService) { }

  ngOnInit(): void {
    this.getAllBooks()
  }

  getAllBooks(){
    this.bookService.getAllBooks().subscribe((res: any) => {
      this.books = res.message
    })
  }
  viewBook(bookId:any){
    this.router.navigate(['/viewbook'], { queryParams: { bookId: bookId } });
  }

}
