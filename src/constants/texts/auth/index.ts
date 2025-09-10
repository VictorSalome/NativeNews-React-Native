import type { IAuthTexts } from "./types";

export const AuthTexts: IAuthTexts = {
  SignIn: {
    title: "Bem-vindo!",
    description: "Faça login para continuar",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Senha",
    forgotPasswordButton: "Esqueceu a senha?",
    loginButton: "Entrar",
    noAccountText: "Não tem uma conta? ",
    createAccountButton: "Criar Conta",
    rememberCredentials: "Lembrar Credenciais",
  },
  SignUp: {
    title: "Crie sua conta",
    description: "Cadastre-se para continuar",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Senha",
    confirmPasswordPlaceholder: "Confirmar Senha",
    signUpButton: "Cadastrar",
    alreadyHaveAccountText: "Já tem uma conta? ",
    signInButton: "Entrar",
  },
  ForgotPassword: {
    title: "Recuperar Senha",
    description: "Digite seu email para recuperar a senha",
    emailPlaceholder: "Email",
    recoverButton: "Recuperar Senha",
    backToLoginButton: "Voltar para Login",
  },
};
