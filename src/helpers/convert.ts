export const ConvertPrice = (price: number): string => {
  if (!price || price === 0) {
    return "Miễn phí";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const ConvertDate = (date: string, format?: string): string => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hour = newDate.getHours();
  const min = newDate.getMinutes();

  switch (format) {
    case "DD-MM-YYYY":
      return ("0" + day).slice(-2) + "-" + ("0" + month).slice(-2) + "-" + year;

    case "DD-MM-YYYY HH-MM":
      return (
        ("0" + day).slice(-2) +
        "-" +
        ("0" + month).slice(-2) +
        "-" +
        year +
        " " +
        hour +
        ":" +
        min
      );

    default:
      return ("0" + day).slice(-2) + "/" + ("0" + month).slice(-2) + "/" + year;
  }
};

export const timeAgo = (date: any) => {
  const newdate = new Date(date);
  const currentDate = new Date();
  var seconds = Math.floor((currentDate.getTime() - newdate.getTime()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return ConvertDate(date, "DD-MM-YYYY HH-MM");
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return ConvertDate(date, "DD-MM-YYYY HH-MM");
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return ConvertDate(date, "DD-MM-YYYY HH-MM");
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " giờ trước";
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " phút trước";
  }

  return Math.floor(seconds) + " giây trước";
};
