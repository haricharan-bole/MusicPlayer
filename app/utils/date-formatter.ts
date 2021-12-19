import "intl"

import "intl/locale-data/jsonp/en"

class DateFormatter {
  formatToMMMYYYY(dateString: string): string {
    return `${new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(dateString),
    )} ${new Date(dateString).getFullYear()}`
  }
}

export default DateFormatter
