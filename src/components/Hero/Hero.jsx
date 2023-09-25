import React, { useState } from "react";
import { t } from "i18next";

const Hero = (props) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="hero">
      <div className="wrapper">
        <h2 className="hero__title title">
          {t("index.heroTitle")}
        </h2>
        <div className="hero__content">
          <div className="hero__col">
            <div className="hero__video">
              <iframe
                src="https://www.youtube-nocookie.com/embed/JJc-WaZRGSI"
                loading="lazy"
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                allowFullScreen
                title="Balsu talka video"
              ></iframe>
            </div>

            <p className="hero__tags">
              {t("index.heroTags")}
            </p>
          </div>

          <div className="hero__col">
            <h3 className="hero__subtitle">
              {t("index.heroSubtitle")}
            </h3>
            <div className="hero__text text-editor">
              <p>
                {t("index.heroIntro")}
              </p>
              {!showMore && (
                <p className="gradienText">
                  {t("index.heroIntroFadeout")}
                </p>
              )}
              {showMore && (
                <>
                  <p>
                    {t("index.heroIntroFull1")}
                  </p>
                  <p>
                    {t("index.heroIntroFull2")}
                  </p>
                </>
              )}
              {!showMore && (
                <button className="showMoreButton" onClick={toggleShowMore}>
                  {t("index.heroShowAll")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
