import Icons from "~components/Icons/Icons";

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
              href="https://commonvoice.mozilla.org/lv/speak"
              target="_blank"
              rel="noopener"
              title="Atvērt runā saiti"
              className="future__link"
            ></a>
            <h3 className="future__subtitle subtitle">Runā</h3>
            <div className="future__box">
              <div className="future__text text-editor">
                <p>
                  Ierunā dažus teikumus un palīdzi attīstīt runas tehnoloģijas latviešu valodā!
                </p>
              </div>
              <Icons type={"mic"} />
            </div>
            <span className="future__out">
              <Icons type={"outsource"} />
            </span>
          </div>
          <div className="future__card">
            <a
              href="https://commonvoice.mozilla.org/lv/listen"
              target="_blank"
              rel="noopener"
              title="Atvērt klausies saiti"
              className="future__link"
            ></a>
            <h3 className="future__subtitle subtitle">Klausies</h3>
            <div className="future__box">
              <div className="future__text text-editor">
                <p>
                  Palīdzi novērtēt, kā ierunājuši citi! Ierakstu pārbaude ir vienlīdz svarīga.
                </p>
              </div>
              <Icons type={"listen"} />
            </div>
            <span className="future__out">
              <Icons type={"outsource"} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Future;
