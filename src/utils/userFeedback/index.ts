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
