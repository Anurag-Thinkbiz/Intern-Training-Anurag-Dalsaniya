export type languageReduxType = {
  language: string;
};

export type accessTokenType={
  accessToken:string
}
export type authSliceType={
 token:string|null|accessTokenType
}