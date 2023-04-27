const Future = (props) => {
  return (
    <section className="future">
      <div className="wrapper">
        <h2 className="future__title title">
          Ieguldi latviešu valodas nākotnē!
        </h2>
        <div className="future__content">
          <div className="future__card">
            <a
              href="#"
              target="_blank"
              rel="noopener"
              title="Atvērt runā saiti"
            ></a>
            <h3 className="future__subtitle subtitle">Runā</h3>
            <div className="future__box">
              <div className="future__text text-editor">
                <p>
                  Ziedo savu balsi līdzās tūkstošiem citu! Jo vairāk un
                  daudzveidīgāki būs balsu paraugi, jo ātrāk un veiksmīgāk
                  izdosies attīstīt runas tehnoloģijas latviešu valodā!
                </p>
              </div>
              <img src="/assets/images/svg/mic.svg"></img>
            </div>
          </div>
          <div className="future__card">
            <a
              href="#"
              target="_blank"
              rel="noopener"
              title="Atvērt klausies saiti"
            ></a>
            <h3 className="future__subtitle subtitle">Klausies</h3>
            <div className="future__box">
              <div className="future__text text-editor">
                <p>
                  Palīdzi novērtēt, kā ierunājuši citi! Ierakstu apstiprināšana
                  ir vienlīdz svarīga, lai radītu kvalitatīvus un atvērtus runas
                  datus.
                </p>
              </div>
              <img src="/assets/images/svg/listen.svg"></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;
