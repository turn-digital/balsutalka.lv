import { t } from "i18next";

const Header = (props) => {
  return (
    <header className="header">
      <div className="wrapper">
        <a className="header__link" href={t("index.headerLinkUrl")}>
          {t("index.headerLink")}
        </a>
        <img
          className="header__logo"
          src="/assets/images/svg/logo.svg"
          width="315px"
          height="52px"
          alt="Balsu talka logo"
        ></img>
      </div>
    </header>
  );
};

export default Header;
