import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  books: Array<any> = []
  constructor(private  router:Router,private bookService:BookService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllBooks()
  }
  getAdminLoggedIn()
  {
    return this.authenticationService.isAdminLoggedIn();
  }
  onEnter(bookName){
    if(bookName==''){
      this.getAllBooks()
    }else{
      try{
        this.bookService.getAllBooksBasedOnName(bookName).subscribe((res: any) => {
          this.books = res.message
        })
      }catch(error){
        this.getAllBooks()
      }
    }
    
  }
  getAllBooks(){
    this.bookService.getAllBooks().subscribe((res: any) => {
      this.books = res.message
    })
  }
  viewBook(bookId:any){
    this.router.navigate(['/viewbook'], { queryParams: { bookId: bookId } });
  }
  deleteBook(id:any){
    this.bookService.deleteBook(id).subscribe((res: any) => {
      if(res.success){
        alert('Book Deleted Successfully From the library!')
        window.location.reload()
      }else{
        alert('Error in Deleting the Book!')
      }
    })
  }

}
