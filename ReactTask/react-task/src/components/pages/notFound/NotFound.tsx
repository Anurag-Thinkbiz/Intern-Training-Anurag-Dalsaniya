import { useTranslation } from "react-i18next";
import { NotFoundTitle } from "../../styles/heading.style";


const NotFound = () => {
  const { t } = useTranslation();
  return (
    <NotFoundTitle>{t('Not Found')}</NotFoundTitle>
  )
}
export default NotFound;