import { useTranslation } from "react-i18next";
import { languages } from "../../../utils/Constants/languageConstant";
import { useAppDispatch, useAppSelector } from "../../../data/modal/types/hookTypes/hookType";
import { changeLanguage } from "../../../redux/slices/language.slice";
import SelectMenu from "../../atoms/SelectMenu/SelectMenu";

export const ChangeLanguageMolecules = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLanguageFromStore = useAppSelector((state)=>state.language.language)
  
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <>
      <SelectMenu 
        options={languages}
        value={currentLanguageFromStore}
        onChange={handleLanguageChange}
      />
    </>
  );
};
