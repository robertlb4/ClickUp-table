import { Pipe, PipeTransform } from '@angular/core';
import { SortRule } from '../click-up-table/click-up-table.component';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(
    value: any[],
    rules: SortRule[] = [],
    sortingFunction?: (sortRules: SortRule[], data: any[]) => any[] //custom sorting function
  ): any[] {
    return sortingFunction? sortingFunction(rules, value) : this.sort(rules, value);
  }

  // Sorty by mutliple column direction is either 1 or -1
  sort(sortRules: SortRule[], data: any[]) {
    const sorted = [...data].sort((a, b) => {
      let result = 0;
      for (const rule of sortRules) {
        if (result !== 0) break;

        result = rule.direction*(
          a[rule.column].toString() < b[rule.column].toString()
            ? -1
            : a[ rule.column ].toString() > b[ rule.column ].toString()
              ? 1
              : 0
        );
      }
      return result;
    });
    return sorted
  }

}
