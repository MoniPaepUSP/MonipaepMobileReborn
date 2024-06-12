import React from "react";

export function handleInputCPFBlur(
  setIsCPFFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCPFFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setCPF: React.Dispatch<React.SetStateAction<string | undefined>>,
  cpf: string
) {
  setIsCPFFocused(false);
  setIsCPFFilled(!!cpf);
}

export function handleInputCPFFocus(
  setIsCPFFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsCPFFocused(true);
}

export function handleInputCPFChange(
  setIsCPFFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setCPF: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsCPFFilled(!!value);
  setCPF(value);
}

export function handleInputPasswordBlur(
  setIsPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>,
  password: string
) {
  setIsPasswordFocused(false);
  setIsPasswordFilled(!!password);
}

export function handleInputPasswordFocus(
  setIsPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsPasswordFocused(true);
}

export function handleInputPasswordChange(
  setIsPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsPasswordFilled(!!value);
  setPassword(value);
}

export function resetCPF(
  setCPF: React.Dispatch<React.SetStateAction<string>>,
  setIsCPFFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCPFFilled: React.Dispatch<React.SetStateAction<boolean>>
) {
  setCPF("");
  setIsCPFFocused(false);
  setIsCPFFilled(false);
}

export function resetPassword(
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>
) {
  setPassword("");
  setIsPasswordFocused(false);
  setIsPasswordFilled(false);
}

export function resetAll(
  setCPF: React.Dispatch<React.SetStateAction<string>>,
  setIsCPFFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCPFFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>
) {
  resetCPF(setCPF, setIsCPFFocused, setIsCPFFilled);
  resetPassword(setPassword, setIsPasswordFocused, setIsPasswordFilled);
}

export function validatePassword(password: string) {
  let regexPass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (password.length < 8) {
    return false;
  }

  return regexPass.test(password) ? true : false;
}
