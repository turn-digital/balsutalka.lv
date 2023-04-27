const Hero = (props) => {
  return (
    <div className="hero">
      <div className="wrapper">
        <h2 className="hero__title">
          Balsu talka – ieguldījums atvērtā latviešu valodas runas bankā
        </h2>
        <div className="hero__content">
          <div className="hero__col">
            <div className="hero__video">
              <iframe
                src="https://www.youtube.com/embed/tgbNymZ7vqY"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                allowfullscreen
              ></iframe>
            </div>

            <p className="hero__tags">
              #valodasTehnoloģija, #balssAsistents, #subtitri, #siri,
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
                runas datu kopu, mēs aicinām kopīgiem spēkiem ierunāt vismaz 100
                stundas.
              </p>
              <p>
                Kaut arī runas tehnoloģijas šobrīd strauji attīstās, tomēr
                aizvien daudzas iekārtas latviešu valodu saprot slikti.
                Piemēram, mēs nevaram latviski dot balss komandas televizoriem,
                automašīnām vai telefoniem. Video zvanos nav iespējams
                automātiski un bez maksas izmantot latviešu valodas subtitrus
                labā kvalitātē. Ir arī maz lietotņu, kurās latviski varētu
                rakstīt , izmantojot balsi, nevis tastatūru. Tas ir tāpēc, ka
                nav pieejami atvērti un brīvi lietojami latviešu valodas runas
                dati. Tas kavē jaunu ideju attīstību un rada grūtības pasaules
                uzņēmumiem un zinātniekiem iekļaut latviešu valodu savās
                tehnoloģijās un runas atpazīšanas pētījumos.
              </p>
              <p>
                Balsu paraugu vākšanai izmantojam Mozilla Common Voice
                platformu, kur savāktie balsu dati ir pieejami ikvienam. Bet jo
                sevišķi svarīgi tie ir uzņēmumiem tehnoloģisko risinājumu
                attīstīšanai un valodas pētniekiem visā pasaulē.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
