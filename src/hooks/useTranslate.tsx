import { IntlContext, useIntl } from 'react-intl';
import { useContext } from 'react';

export const useTranslate = () => {
  const intl = useIntl();
  const { locale } = useContext(IntlContext);
  const trans = (id: string) => id ? intl.formatMessage({ id }) : '';

  return {
    trans,
    locale
  };
};
