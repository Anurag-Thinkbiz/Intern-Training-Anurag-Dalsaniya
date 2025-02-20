export type formInputTextType = {
  type: string;
  value?: string;
  name: string;
  labelText: string;
  htmlForLabel: string;
  placeholder?: string;
  checked?: boolean;
};

export type FormDataType = {
  name: string;
  password: string;
  email: string;
  address: string;
  role: boolean;
};

export type loginDataType = {
  email: string;
  password: string;
};
