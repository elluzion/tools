export default class Formatter {
  //#region Dates
  static formatDate(date: Date, shorten: boolean): string {
    const day = date.getDate();
    const ordinalSuffix: string = Formatter.getOrdinalSuffix(day);
    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let monthName = monthNames[date.getMonth()];
    let year = date.getFullYear().toString();

    if (shorten) {
      if (monthName.length > 5) {
        monthName = monthName.slice(0, 3) + '.';
      }
      year = year.slice(2);
    }

    return `${day}${ordinalSuffix} ${monthName} ${year}`;
  }
  //#endregion

  //#region Lists
  static joinList(list: string[]): string {
    if (list.length === 2) {
      return list.join(' and ');
    } else if (list.length > 2) {
      return list.slice(0, -1).join(', ') + ' & ' + list[list.length - 1];
    } else {
      return list[0] || '';
    }
  }
  //#endregion

  //#region Private
  private static getOrdinalSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return 'th';
    } else {
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }
  }
  //#endregion
}
