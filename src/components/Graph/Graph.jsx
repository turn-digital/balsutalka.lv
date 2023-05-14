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
              <span>Izaicinājums</span>Ierunāsim 200 stundas šovasar!
            </p>
          </div>
          <div className="graph__col">
            <div className="graph__table">
              <div className="graph__row">
                <div className="graph__stat">
                  <span>Ierunāts</span>
                  <span>{lvHours.total}/200 h</span>
                </div>
                <ProgressSvg hours={lvHours.total} />
              </div>
              <div className="graph__row">
                <div className="graph__stat">
                  <span>Pārbaudīts</span>
                  <span>{lvHours.valid}/200 h</span>
                </div>
                <ProgressSvg hours={lvHours.valid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Graph;
