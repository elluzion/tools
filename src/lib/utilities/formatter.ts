export default class Formatter {
  //#region Dates
  static formatDate(date: Date, shorten: boolean = false): string {
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

  static getDaysBetweenDates(date1: Date, date2: Date): number {
    // Convert both dates to milliseconds
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    const differenceMs = Math.abs(date2Ms - date1Ms);
    const days = Math.floor(differenceMs / 86400000);
    return days;
  }

  static getDaysFromNow(date: Date): number {
    const now = new Date();
    return Formatter.getDaysBetweenDates(now, date);
  }
  //#endregion

  //#region Lists
  static joinList(list: string[], nice: boolean = false): string {
    if (!nice) {
      return list.join(', ');
    } else if (list.length === 2) {
      return list.join(' and ');
    } else if (list.length > 2) {
      return list.slice(0, -1).join(', ') + ' & ' + list[list.length - 1];
    } else {
      return list[0] || '';
    }
  }
  //#endregion

  //#region String modification
  static pascalCase(input: string) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  }

  static toUrlSafeString(input: string) {
    input = input
      .toLowerCase()
      .normalize('NFD') // normalize string
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/[^a-zA-Z0-9 ]/g, ''); // remove all characters except letters, numbers and whitespace
    return this.cleanWhitespace(input, '-');
  }

  static cleanWhitespace(input: string, filler?: string) {
    return input.replace(/\s+/g, filler || ' ').trim();
  }

  static improveSoundcloudArtwork(
    url: string,
    targetSize: 'large' | 'original' | 't500x500' = 't500x500',
  ) {
    if (url.includes('sndcdn.com/artworks-')) {
      return url.replace(/([tl]\d+x\d+|(?:large|original))(?=\.\w+$)/, targetSize);
    }
  }
  //#endregion

  //#region URLs
  static extractDomain(url: string): string | undefined {
    try {
      // Create a URL object
      const urlObject = new URL(url);

      // Extract the hostname
      let domain = urlObject.hostname;

      // Remove 'www.' if present
      domain = domain.replace(/^www\./, '');

      return domain;
    } catch (error) {
      // The URL is invalid
      return undefined;
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
