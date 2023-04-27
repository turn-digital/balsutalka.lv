const Graph = (props) => {
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
                  <span>18/100 h</span>
                </div>
                <img
                  src="/assets/images/svg/latvija.svg"
                  alt="Latvijai ir 18h attēlots stabiņu diagrammā"
                ></img>
              </div>
              <div className="graph__row">
                <div className="graph__stat">
                  <span>Igauņu</span>
                  <span>56/100 h</span>
                </div>
                <img
                  src="/assets/images/svg/igaunu.svg"
                  alt="Igaunijai ir 56h attēlots stabiņu diagrammā"
                ></img>
              </div>
              <div className="graph__row">
                <div className="graph__stat">
                  <span>Lietuviešu</span>
                  <span>54/100 h</span>
                </div>
                <img
                  src="/assets/images/svg/lietuva.svg"
                  alt="Lietuvai ir 54h attēlots stabiņu diagrammā"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Graph;
