export enum AppRoutes {
  ApresentationOne = "/(onboarding)/apresentationOne",
  ApresentationTwo = "/(onboarding)/apresentationTwo",
  ApresentationThree = "/(onboarding)/apresentationThree",

  SignUp = "/(auth)/sign-up",
  SignIn = "/(auth)/sign-in",

  ForgotPassword = "/(auth)/forgot-password",
  Home = "/(dashboard)/home",
  Profile = "/(dashboard)/profile",
  Settings = "/(dashboard)/settings",
  
  ThemeExample = "/(examples)/theme-example",
}

export enum AppNames {
  ApresentationOne = "apresentationOne/index",
  ApresentationTwo = "apresentationTwo/index",
  ApresentationThree = "apresentationThree/index",

  SignUp = "sign-up/index",
  ThemeExample = "theme-example/index",
  SignIn = "sign-in/index",
  ForgotPassword = "forgot-password/index",

  Home = "home/index",
  Profile = "profile/index",
  Settings = "settings/index",
}

export enum AppGroupNames {
  Onboarding = "(onboarding)",
  Auth = "(auth)",
  Dashboard = "(dashboard)",
}

const appRoutes = {
  AppRoutes,
  AppNames,
  AppGroupNames,
};

export default appRoutes;
