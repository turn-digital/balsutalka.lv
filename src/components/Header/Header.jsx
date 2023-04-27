const Header = (props) => {
  console.log("Header");
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <p>Balsu talka – ieguldījums atvērtā latviešu valodas runas bankā</p>
          <iframe
            width="420"
            height="315"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
          <p>
            #valodasTehnoloģija, #balssAsistents, #subtitri, #siri,
            #mākslīgaisIntelekts, #balssAI, #rakstītArBalsi
          </p>
        </div>
        <div>
          <h1>Kas tas ir un kā strādā?</h1>
          <p>
            “Balsu talka” ir projekts latviešu valodas nākotnei. Tā mērķis ir
            nodrošināt latviešu valodas pieejamību tehnoloģiju attīstībai. To
            iespējams panākt, savācot balsu paraugus. Lai izveidotu
            daudzveidīgu, atvērtu un ikvienam pieejamu latviešu runas datu kopu,
            mēs aicinām kopīgiem spēkiem ierunāt vismaz 100 stundas. Kaut arī
            runas tehnoloģijas šobrīd strauji attīstās, tomēr aizvien daudzas
            iekārtas latviešu valodu saprot slikti. Piemēram, mēs nevaram
            latviski dot balss komandas televizoriem, automašīnām vai
            telefoniem. Video zvanos nav iespējams automātiski un bez maksas
            izmantot latviešu valodas subtitrus labā kvalitātē. Ir arī maz
            lietotņu, kurās latviski varētu rakstīt , izmantojot balsi, nevis
            tastatūru. Tas ir tāpēc, ka nav pieejami atvērti un brīvi lietojami
            latviešu valodas runas dati. Tas kavē jaunu ideju attīstību un rada
            grūtības pasaules uzņēmumiem un zinātniekiem iekļaut latviešu valodu
            savās tehnoloģijās un runas atpazīšanas pētījumos. Balsu paraugu
            vākšanai izmantojam Mozilla Common Voice platformu, kur savāktie
            balsu dati ir pieejami ikvienam. Bet jo sevišķi svarīgi tie ir
            uzņēmumiem tehnoloģisko risinājumu attīstīšanai un valodas
            pētniekiem visā pasaulē.{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
