import { useTranslation } from "react-i18next";
import i18n from "i18next";

const LanguageSwitcher = () => {
  const { t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost m-1">
        {/* آیکون یا متن برای نمایش dropdown */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        {t("language")} {/* نمایش متن "Language" یا "زبان" */}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a onClick={() => changeLanguage("en")}>English</a>
        </li>
        <li>
          <a onClick={() => changeLanguage("fa")}>فارسی</a>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
