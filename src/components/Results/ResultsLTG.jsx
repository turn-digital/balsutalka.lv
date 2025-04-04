const ResultsLTG = (props) => {
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
                                                                                                   href="https://huggingface.co/AiLab-IMCS-UL/whisper-large-v3-latgalian-2503">jaudīgu
                  runas atpazīšanas modeli</a> ar salīdzinoši augstu atpazīšanas precizitāti runas datu analīzei un
                  subtitru veidošanai. <br/>Šo modeli var izmēģināt <a target="_blank" href="http://ltg.late.ailab.lv/">ltg.late.ailab.lv</a>.
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsLTG;
