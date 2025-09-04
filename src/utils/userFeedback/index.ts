import Toast from "react-native-toast-message";

const defaultConfig = {
  visibilityTime: 3000,
  position: "top" as const,
  autoHide: true,
};

export const showLoginSuccess = () => {
  Toast.show({
    type: "success",
    text1: "Login realizado com sucesso",
    text2: "Bem-vindo ao Native News!",
    ...defaultConfig,
  });
};

export const showLoginError = () => {
  Toast.show({
    type: "error",
    text1: "Login falhou",
    text2: "Por favor, verifique suas credenciais",
    ...defaultConfig,
  });
};

export const showSignUpSuccess = () => {
  Toast.show({
    type: "success",
    text1: "Cadastro realizado com sucesso",
    text2: "Por favor, faça login",
    ...defaultConfig,
  });
};

export const showSignUpError = () => {
  Toast.show({
    type: "error",
    text1: "Cadastro falhou",
    text2: "Por favor, verifique suas credenciais",
    ...defaultConfig,
  });
};

export const showForgotPasswordSuccess = () => {
  Toast.show({
    type: "success",
    text1: "Recuperação de senha realizada com sucesso",
    text2: "Por favor, verifique seu email",
    ...defaultConfig,
  });
};

export const showForgotPasswordError = () => {
  Toast.show({
    type: "error",
    text1: "Recuperação de senha falhou",
    text2: "Por favor, verifique seu email",
    ...defaultConfig,
  });
};
