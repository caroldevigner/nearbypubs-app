import * as yup from "yup";

import I18n from "./I18n";

const yupLocale = I18n.t("yup");
yup.setLocale(yupLocale);

export default yup;
