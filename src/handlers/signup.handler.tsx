export function handleInputEmailBlur(
  setIsEmailFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEmailFilled: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsEmailFocused(false);
}

export function handleInputEmailChange(
  text: string,
  setIsEmailFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
) {
  setIsEmailFilled(!!text);
  setEmail(text);
}

export function handleInputEmailFocus(
  setIsEmailFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsEmailFocused(true);
}

export function handleInputNameBlur(
  setIsNameFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsNameFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setName: React.Dispatch<React.SetStateAction<string | undefined>>,
  name: string
) {
  setIsNameFocused(false);
  setIsNameFilled(!!name);
}

export function handleInputNameFocus(
  setIsNameFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsNameFocused(true);
}

export function handleInputNameChange(
  setIsNameFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setName: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsNameFilled(!!value);
  setName(value);
}

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

export function handleInputPhoneBlur(
  setIsPhoneFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPhoneFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setPhone: React.Dispatch<React.SetStateAction<string>>,
  phone: string
) {
  setIsPhoneFocused(false);
  setIsPhoneFilled(!!phone);
}

export function handleInputPhoneFocus(
  setIsPhoneFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsPhoneFocused(true);
}

export function handleInputPhoneChange(
  setIsPhoneFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setPhone: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsPhoneFilled(!!value);
  setPhone(value);
}

export function handleInputDateBlur(
  setIsDateFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDateFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>,
  date: string
) {
  setIsDateFocused(false);
  setIsDateFilled(!!date);
}

export function handleInputDateFocus(
  setIsDateFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsDateFocused(true);
}

export function handleInputDateChange(
  setIsDateFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setDate: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsDateFilled(!!value);
  setDate(value);
}

export function handleInputHomeAddressBlur(
  setIsHomeAddressFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsHomeAddressFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setHomeAddress: React.Dispatch<React.SetStateAction<string | undefined>>,
  homeAddress: string
) {
  setIsHomeAddressFocused(false);
  setIsHomeAddressFilled(!!homeAddress);
}

export function handleInputHomeAddressFocus(
  setIsHomeAddressFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsHomeAddressFocused(true);
}

export function handleInputHomeAddressChange(
  setIsHomeAddressFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setHomeAddress: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsHomeAddressFilled(!!value);
  setHomeAddress(value);
}

export function handleInputWorkAddressBlur(
  setIsWorkAddressFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsWorkAddressFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setWorkAddress: React.Dispatch<React.SetStateAction<string | undefined>>,
  workAddress: string
) {
  setIsWorkAddressFocused(false);
  setIsWorkAddressFilled(!!workAddress);
}

export function handleInputWorkAddressFocus(
  setIsWorkAddressFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsWorkAddressFocused(true);
}

export function handleInputWorkAddressChange(
  setIsWorkAddressFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setWorkAddress: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsWorkAddressFilled(!!value);
  setWorkAddress(value);
}

export function handleInputHealthPlan(
  setHealthPlanSelection: React.Dispatch<React.SetStateAction<boolean>>
) {
  setHealthPlanSelection((prevState) => !prevState);
}

export function handleInputAllowMessage(
  setAllowMessageSelection: React.Dispatch<React.SetStateAction<boolean>>
) {
  setAllowMessageSelection((prevState) => !prevState);
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

export function handleInputConfirmPasswordBlur(
  setIsConfirmPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsConfirmPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>,
  confirmPassword: string
) {
  setIsConfirmPasswordFocused(false);
  setIsConfirmPasswordFilled(!!confirmPassword);
}

export function handleInputConfirmPasswordFocus(
  setIsConfirmPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsConfirmPasswordFocused(true);
}

export function handleInputConfirmPasswordChange(
  setIsConfirmPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsConfirmPasswordFilled(!!value);
  setConfirmPassword(value);
}

export function handleInputNeighborhoodBlur(
  setIsNeighborhoodFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsNeighborhoodFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setNeighborhood: React.Dispatch<React.SetStateAction<string>>,
  neighborhood: string
) {
  setIsNeighborhoodFocused(false);
  setIsNeighborhoodFilled(!!neighborhood);
}

export function handleInputNeighborhoodFocus(
  setIsNeighborhoodFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsNeighborhoodFocused(true);
}

export function handleInputNeighborhoodChange(
  setIsNeighborhoodFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setNeighborhood: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  setIsNeighborhoodFilled(!!value);
  setNeighborhood(value);
}

export function handleInputHouseNumberBlur(
  setIsHouseNumberFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsHouseNumberFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setHouseNumber: React.Dispatch<React.SetStateAction<string>>,
  houseNumber: string
) {
  setIsHouseNumberFocused(false);
  setIsHouseNumberFilled(!!houseNumber);
}

export function handleInputHouseNumberFocus(
  setIsHouseNumberFocused: React.Dispatch<React.SetStateAction<boolean>>
) {
  setIsHouseNumberFocused(true);
}

export function handleInputHouseNumberChange(
  setIsHouseNumberFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setHouseNumber: React.Dispatch<React.SetStateAction<string>>,
  value: string
) {
  // const parsedValue = parseInt(value);
  setIsHouseNumberFilled(!!value);
  setHouseNumber(value);
}

export function resetField<T>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFilled: React.Dispatch<React.SetStateAction<boolean>>,
  initialValue: T
) {
  setState(initialValue);
  setIsFocused(false);
  setIsFilled(false);
}

export function resetPassword(
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>,
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
  setIsConfirmPasswordFocused: React.Dispatch<React.SetStateAction<boolean>>,
  setIsConfirmPasswordFilled: React.Dispatch<React.SetStateAction<boolean>>
) {
  setPassword("");
  setIsPasswordFocused(false);
  setIsPasswordFilled(false);
  setConfirmPassword("");
  setIsConfirmPasswordFocused(false);
  setIsConfirmPasswordFilled(false);
}


export function validateEmail(email: string) {
  // Regex Check
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length <= 0) {
    return false;
  }

  return regexEmail.test(email) ? true : false;
}

export function validatePassword(password: string) {
  let regexPass =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  if (password.length < 8) {
    return false;
  }

  return regexPass.test(password) ? true : false;
}
