// #docregion
import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class WikipediaService {
  constructor(private jsonp: Jsonp) {}

  search(term: string) {
    const wikiUrl = 'https://zh.wikipedia.org/w/api.php';

    // #docregion search-parameters
    const params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('limit', '5');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    // #enddocregion search-parameters

    // #docregion call-jsonp
    // TODO: Add error handling
    return this.jsonp
      .get(wikiUrl, { search: params })
      .pipe(map(response => <string[]>response.json()[1]));
    // #enddocregion call-jsonp
  }
}
