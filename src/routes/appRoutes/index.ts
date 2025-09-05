export enum AppRoutes {
  ApresentationOne = "/(onboarding)/apresentationOne",
  ApresentationTwo = "/(onboarding)/apresentationTwo",
  ApresentationThree = "/(onboarding)/apresentationThree",

  SignUp = "/(auth)/sign-up",
  SignIn = "/(auth)/sign-in",

  ForgotPassword = "/(auth)/forgot-password",
  Home = "/(dashboard)/home",
  ProfileUser = "/(dashboard)/profile",
  News = "/(dashboard)/news",
  Weather = "/(dashboard)/weather",

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
  News = "news/index",
  Weather = "weather/index",
  ProfileUser = "profileUser/index",
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
