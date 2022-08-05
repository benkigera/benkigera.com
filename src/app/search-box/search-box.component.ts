import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  buttonClicked = false
  views = '';
  url = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit($event: any) {
    this.url = $event.target.value;
  }



  searchForVideo() {

    var urlString = 'https://benkigera.herokuapp.com/download/' + this.url.substring(this.url.length - 11);
    console.log(urlString);
    //Send Http request
    return this.http
      .get(urlString
        , { responseType: 'text' }).subscribe(responsedata => {
          console.log(responsedata)
          this.views = responsedata;
          this.buttonClicked = true
        })


  }

}
