import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  buttonClicked = false
  title = '';
  url = '';
  image = '';

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
          this.title = responsedata;
          this.buttonClicked = true;
          this.generateThumbnail()
        })


  }

  generateThumbnail() {
    var urlString = 'https://benkigera.herokuapp.com/thumbnail/' + this.url.substring(this.url.length - 11);

    console.log(urlString);
    //Send Http request
    return this.http
      .get(urlString
        , { responseType: 'text' }).subscribe(responsedata => {
          console.log(responsedata)
          this.image = responsedata;
        })

  }

  downloadVideo() {
    var urlString = 'https://benkigera.herokuapp.com/downloadVideo/' + this.url.substring(this.url.length - 11);
    console.log(urlString);
    //Send Http request
    //download video from url

    return this.http.get(urlString, { responseType: 'blob' }).subscribe(data => {
      var blob = new Blob([data], { type: 'video/mp4' });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = this.title + '.mp4';
      a.click();
    });
  
  }

}
