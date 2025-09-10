import type { AppRoutes } from "@/routes/appRoutes";

export interface IViewAllNewsButtonProps {
  viewAll: string;
  pathName: keyof typeof AppRoutes | string;
}
