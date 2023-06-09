import React, { useState } from "react";
const Hero = (props) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="hero">
      <div className="wrapper">
        <h2 className="hero__title title">
          Balsu talka – palīdzi attīstīt tehnoloģijas latviešu valodā
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
              #BalsuTalka #valodasTehnoloģija, #balssAsistents, #subtitri, #siri,
              #mākslīgaisIntelekts, #balssAI, #rakstītArBalsi
            </p>
          </div>

          <div className="hero__col">
            <h3 className="hero__subtitle">Kas tas ir un kā strādā?</h3>
            <div className="hero__text text-editor">
              <p>
                “Balsu talka” ir projekts latviešu valodas nākotnei. Tā mērķis
                ir nodrošināt latviešu valodas pieejamību tehnoloģiju
                attīstībai. To iespējams panākt, savācot balsu paraugus. Lai
                izveidotu daudzveidīgu, atvērtu un ikvienam pieejamu latviešu
                runas datu kopu, mēs aicinām kopīgiem spēkiem ierunāt vismaz 1000
                stundas.
              </p>
              {!showMore && (
                <p className="gradienText">
                  Kaut arī runas tehnoloģijas šobrīd strauji attīstās, tomēr
                  aizvien daudzas iekārtas latviešu valodu saprot slikti.
                  Piemēram, mēs nevaram latviski dot
                </p>
              )}
              {showMore && (
                <>
                  <p>
                    Kaut arī runas tehnoloģijas šobrīd strauji attīstās, tomēr
                    aizvien daudzas iekārtas latviešu valodu saprot slikti.
                    Piemēram, mēs nevaram latviski dot balss komandas
                    televizoriem, automašīnām vai telefoniem. Video zvanos nav
                    iespējams automātiski un bez maksas izmantot latviešu
                    valodas subtitrus labā kvalitātē. Ir arī maz lietotņu, kurās
                    latviski varētu rakstīt, izmantojot balsi, nevis tastatūru.
                    Tas ir tāpēc, ka nav pieejami atvērti un brīvi lietojami
                    latviešu valodas runas dati. Tas kavē jaunu ideju attīstību
                    un rada grūtības pasaules uzņēmumiem un zinātniekiem iekļaut
                    latviešu valodu savās tehnoloģijās un runas atpazīšanas
                    pētījumos.
                  </p>
                  <p>
                    Balsu paraugu vākšanai izmantojam Mozilla Common Voice
                    platformu, kur savāktie balsu dati ir pieejami ikvienam. Bet
                    jo sevišķi svarīgi tie ir uzņēmumiem tehnoloģisko risinājumu
                    attīstīšanai un valodas pētniekiem visā pasaulē.
                  </p>
                </>
              )}
              {!showMore && (
                <button className="showMoreButton" onClick={toggleShowMore}>
                  Parādīt visu tekstu
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
