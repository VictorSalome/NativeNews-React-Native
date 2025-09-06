import { format } from "date-fns";

export const convertDateToBr = (date: string) => {
  const parsedDate = new Date(date);
  return format(parsedDate, "dd/MM/yyyy");
};
