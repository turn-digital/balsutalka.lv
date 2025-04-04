const ResultsLV = (props) => {
  return (
    <section className="results">
      <div className="wrapper">
        <p className="results__title title">
          Sasniegtie rezultāti
        </p>
        <div className="results__content text-editor">
          <div className="results__text">
            <p>Lai arī darbs pie Balsu talkas datu vākšanas un apstrādes joprojām notiek, līdz šim savāktie balsu ieraksti
              jau tiek izmantoti un daži rezultāti ir pieejami publiski.
              <ul>
                <li><a target="_blank" href="https://ailab.lv/">LU MII AiLab</a> ir izveidojuši <a target="_blank"
                                                                                                   href="https://huggingface.co/AiLab-IMCS-UL/whisper-large-v3-lv-late-cv19">jaudīgu
                  runas atpazīšanas modeli</a> ar salīdzinoši augstu atpazīšanas precizitāti runas datu analīzei un
                  subtitru veidošanai. <br/>Šo modeli var izmēģināt <a target="_blank" href="https://late.ailab.lv/">late.ailab.lv</a>.
                </li>
                <li>Atvērtā koda kopiena ir izveidojusi <a target="_blank"
                                                           href="https://huggingface.co/RaivisDejus/whisper-small-lv">ātrus
                  runas atpazīšanas modeļus</a> izmantošanai mazas jaudas iekārtās, piemēram, Home Assistant gudro māju
                  risinājumiem. <br/>Modeļus var izmēģināt <a target="_blank"
                                                         href="https://huggingface.co/spaces/RaivisDejus/LatvianSpeechRecognition">demo
                    lapā</a>.
                </li>
                <li>Atvērtā koda kopiena ir izveidojusi <a target="_blank" href="https://github.com/chidiwilliams/buzz">runas
                  atpazīšanas lietotni</a>, kas ļauj veidot subtitrus un tulkot atpazīto saturu audio un video datnēs,
                  kā arī reāla laika runā. <br/>Video pamācība <a target="_blank"
                                                             href="https://www.youtube.com/watch?v=2ngQm06ZwmI">pieejama
                    šeit</a>.
                </li>
                <li>Lingvistiskiem pētījumiem dati ir pieejami vietnē <a target="_blank"
                                                                         href="https://korpuss.lv/?order=dev_date">Korpuss.lv</a>:
                  “Balsu talka” un “Bolsu tolka” korpusos. Abi korpusi ir morfoloģiski marķēti – tajos iespējams meklēt
                  gan pēc morfoloģiskajām pazīmēm, gan pēc vārdu pamatformām, piemēram, var atrast visus 6. deklinācijas
                  lietvārdus vai visas korpusā lietotās darbības vārda “skriet” vai “skrīt” formas un noklausīties, kā
                  šos vārdus mēdz izrunāt. <br/>Vietnes lietošanas pamācība <a target="_blank"
                                                                          href="https://youtu.be/s4nQMnUrElo">pieejama
                    šeit</a>.
                </li>
              </ul>
            </p>
          </div>
          <div className="results__poster">
            <img alt="Balsiu talkā sasniegtais 2023. gadā" src="/assets/images/results.png" width="100%" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsLV;
