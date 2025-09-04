interface IAuthTexts {
  signIn: {
    title: string;
    description: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    loginButton: string;
    noAccountText: string;
    createAccountButton: string;
  };
  signUp: {
    title: string;
    description: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    signUpButton: string;
    alreadyHaveAccountText: string;
    signInButton: string;
  };
  forgotPassword: {
    title: string;
    description: string;
    emailPlaceholder: string;
    recoverButton: string;
    backToLoginButton: string;
  };
}

export const authTexts: IAuthTexts = {
  signIn: {
    title: "Bem-vindo!",
    description: "Faça login para continuar",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Senha",
    forgotPassword: "Esqueceu a senha?",
    loginButton: "Entrar",
    noAccountText: "Não tem uma conta? ",
    createAccountButton: "Criar Conta",
  },
  signUp: {
    title: "Crie sua conta",
    description: "Cadastre-se para continuar",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    confirmPasswordPlaceholder: "Confirmar Password",
    signUpButton: "Cadastrar",
    alreadyHaveAccountText: "Já tem uma conta? ",
    signInButton: "Entrar",
  },
  forgotPassword: {
    title: "Recuperar Senha",
    description: "Digite seu email para recuperar a senha",
    emailPlaceholder: "Email",
    recoverButton: "Recuperar Senha",
    backToLoginButton: "Voltar para Login",
  },
};
