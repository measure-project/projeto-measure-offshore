import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class FilterPipe implements PipeTransform {
	//Filtro para usar no membros atuais
	transform(items: any[], searchText: string): any[] {
		if (!items) {
			return [];
		}
		if (!searchText) {
			return items;
		}
		searchText = searchText.toLocaleLowerCase();

		//O filtro busca o nome ou o endereço(dps acho que tem que mudar)
		return items.filter((item) => {
			return (
				item.name.toLocaleLowerCase().includes(searchText) ||
				item.adress.toLocaleLowerCase().includes(searchText)
			);
		});
	}
}
