import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgForm } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {
  bookForm: FormGroup;
  author: []
  constructor(private formBuilder: FormBuilder, private bookService: BookService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {

    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isbn: ['', Validators.required],
      issuableStatus: ['', Validators.required],
      price: ['', Validators.required],
      auth: ['', Validators.required],

    });
  }

  addBook() {
    var auth={
      author:[]
    }
    console.log(this.author)
    for (var i in this.author) {

      var item = this.author[i];

      auth.author.push({
        "name": item
      });
    }
    const Payload: any = {
      ...this.bookForm.value
    }
    Payload.author=auth.author

   
   if(this.bookForm.valid){
      this.bookService.addNewBook(Payload).subscribe((res: any) => {
        if(res.success){
          alert('New Book Added Successfully!')
          window.location.reload()
        }else{
          alert('Error in Adding New Book!')
        }
      })
    }else{
      alert("Fill all fields")
    }
     console.log(Payload)
  }
}
