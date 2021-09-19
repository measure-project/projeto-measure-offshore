import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadinfoService {

  constructor() { }

  async loadInfoFromPageCache() {
		return await JSON.parse(localStorage.getItem('currentUser') || '{}');
	}
}
