import ProgressSvg from "~components/ProgressSvg/ProgressSvg";

const Graph = ({ lvHours }) => {
  return (
    <section className="graph">
      <div className="wrapper">
        <h2 className="graph__title title">
          Palīdzi attīstīt latviešu valodas tehnoloģijas ar savu balsi!
        </h2>
        <div className="graph__box">
          <div className="graph__col">
            <p className="graph__info">
              <span>Izaicinājums</span>Ierunāsim 100 stundas 4. maijā!
            </p>
          </div>
          <div className="graph__col">
            <div className="graph__table">
              <div className="graph__row">
                <div className="graph__stat">
                  <span>Latviešu</span>
                  <span>{lvHours}/100 h</span>
                </div>
                <ProgressSvg hours={lvHours} />
              </div>
              <div className="graph__row">
                <div className="graph__stat">
                  <span>Igauņu</span>
                  <span>56/100 h</span>
                </div>
                <ProgressSvg hours="56" />
              </div>
              <div className="graph__row">
                <div className="graph__stat">
                  <span>Lietuviešu</span>
                  <span>25/100 h</span>
                </div>
                <ProgressSvg hours="25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Graph;
