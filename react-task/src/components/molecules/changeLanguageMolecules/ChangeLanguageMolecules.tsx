import { useTranslation } from "react-i18next";
import SelectMenu from "../../atoms/SelectMenu/SelectMenu";
import { languages } from "../../../utils/Constants/languageConstant";
import { useAppDispatch } from "../../../data/modal/types/hookTypes/reduxType";
import { changeLanguage } from "../../../redux/slices/language.slice";
import { useAppSelector } from "../../../data/modal/types/hookTypes/reduxType";

export const ChangeLanguageMolecules = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  //   const currentLanguage=localStorage.getItem('i18nextLng');
  const currentLanguage = useAppSelector((state) => state.language.language);

  const handleLanguageChange = 
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(e.target.value);
      dispatch(changeLanguage(e.target.value));
    }  
 

  return (
    <>
      <SelectMenu
        options={languages}
        value={currentLanguage}
        onChange={handleLanguageChange}
      />
    </>
  );
};
