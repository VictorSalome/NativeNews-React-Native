export enum AppRoutes {
  SignUp = "/(auth)/sign-up",
  SignIn = "/(auth)/sign-in",
  ForgotPassword = "/(auth)/forgot-password",
  Home = "/(dashboard)/home",
  Profile = "/(dashboard)/profile",
  Settings = "/(dashboard)/settings",
}

export enum AppNames {
  SignUp = "sign-up/index",

  SignIn = "sign-in/index",
  ForgotPassword = "forgot-password/index",
  Home = "home/index",
  Profile = "profile/index",
  Settings = "settings/index",
}

export enum AppGroupNames {
  Auth = "(auth)",
  Dashboard = "(dashboard)",
}

const appRoutes = {
  AppRoutes,
  AppNames,
  AppGroupNames,
};

export default appRoutes;
