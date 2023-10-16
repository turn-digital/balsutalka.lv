import ProgressSvg from "~components/ProgressSvg/ProgressSvg";
import { t } from "i18next";

const Graph = ({ hours }) => {
  return (
    <section className="graph">
      <div className="wrapper">
        <h2 className="graph__title title">
          {t("index.graphTitle")}
        </h2>
        <div className="graph__box">
          <div className="graph__col">
            <p className="graph__info">
              <span>{t("index.graphChallengeTitle")}</span>
              {t("index.graphChallenge")}
            </p>
          </div>
          <div className="graph__col">
            <div className="graph__table">
              <div className="graph__row">
                <div className="graph__stat">
                  <span>{t("index.graphRecorded")}</span>
                  <span>{Number(hours.total).toFixed(1)}/{t("index.graphGoal")} h</span>
                </div>
                <ProgressSvg hours={hours.total} />
              </div>
              <div className="graph__row">
                <div className="graph__stat">
                  <span>{t("index.graphValidated")}</span>
                  <span>{Number(hours.valid).toFixed(1)}/{t("index.graphGoal")} h</span>
                </div>
                <ProgressSvg hours={hours.valid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Graph;
