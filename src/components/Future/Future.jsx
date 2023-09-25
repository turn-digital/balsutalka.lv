import Icons from "~components/Icons/Icons";
import { t } from "i18next";

const Future = (props) => {
  return (
    <section className="future">
      <div className="wrapper">
        <h2 className="future__title title">
          {t("index.futureTitle")}
        </h2>
        <div className="future__content">
          <div className="future__card">
            <a
              href={t("index.futureSpeakUrl")}
              target="_blank"
              rel="noopener"
              title="Atvērt runā saiti"
              className="future__link"
            ></a>
            <h3 className="future__subtitle subtitle">
              {t("index.futureSpeak")}
            </h3>
            <div className="future__box">
              <div className="future__text text-editor">
                <p>
                  {t("index.futureSpeakExplanation")}
                </p>
              </div>
              <Icons type={"mic"} />
            </div>
            <span className="future__out">
              <Icons type={"outsource"} />
            </span>
          </div>
          <div className="future__card">
            <a
              href={t("index.futureListenUrl")}
              target="_blank"
              rel="noopener"
              title="Atvērt klausies saiti"
              className="future__link"
            ></a>
            <h3 className="future__subtitle subtitle">{t("index.futureListen")}</h3>
            <div className="future__box">
              <div className="future__text text-editor">
                <p>
                  {t("index.futureListenExplanation")}
                </p>
              </div>
              <Icons type={"listen"} />
            </div>
            <span className="future__out">
              <Icons type={"outsource"} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;
