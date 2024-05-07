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
                <li>LU MII AiLab ir izveidojuši <a target="_blank" href="https://huggingface.co/AiLab-IMCS-UL/whisper-large-v3-lv-late-cv17">jaudīgu runas atpazīšanas modeli</a> ar salīdzinoši augstu atpazīšanas precizitāti runas datu analīzei un subtitru veidošanai. Šī modeļa iespējas var izmēģināt <a target="_blank" href="https://colab.research.google.com/gist/raivisdejus/07ca2e37d1fb87f81df12e424cf9175b/latviesu-runas-atpazisana.ipynb">Google Colab vidē</a>. Lietošanas video pamācība ar video subtitru veidošanas piemēru <a target="_blank" href="https://youtu.be/MjeawBpB5xg">pieejama šeit</a>.
                </li>
                <li>Atvērtā koda kopiena ir izveidojusi <a target="_blank" href="https://huggingface.co/RaivisDejus/whisper-small-lv">ātrus runas atpazīšanas modeļus</a> izmantošanai mazas jaudas iekārtās, piemēram, Home Assistant gudro māju risinājumiem. Modeļus var izmēģināt <a target="_blank" href="https://huggingface.co/spaces/RaivisDejus/LatvianSpeechRecognition">demo lapā</a>.
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
