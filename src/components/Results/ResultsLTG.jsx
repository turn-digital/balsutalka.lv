const ResultsLTG = (props) => {
  return (
    <section className="results">
      <div className="wrapper">
        <p className="results__title title">
          Sasnāgtī rezultati
        </p>
        <div className="results__content text-editor">
          <div className="results__text">
            <p>Lai ari dorbs pi Bolsu tolkys datu vuokšonys i apstruodis aizviņ nūteik, da šam savuoktī bolsu īroksti jau teik lītuoti, i puors rezultati ir daīmami publiski.
              <ul>
                <li><a target="_blank" href="https://ailab.lv/">LU MII AiLab</a> ir sataisejuši <a target="_blank"
                                                                                                   href="https://huggingface.co/AiLab-IMCS-UL/whisper-large-v3-latgalian-2503">jaudeigu runys atpazeišonys modeli</a> ar saleidzynūši augstu atpazeišonys precizitati runys datu analizei i subtitru izveiduošonai.
Reiku, kurs izstruoduots iz ituo modeļa bāzis, var paraudzeit <a target="_blank" href="http://ltg.late.ailab.lv/">ltg.late.ailab.lv</a>.
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
