const Section2 = (props) => {
  console.log("Section1");
  return (
    <>
      <div
        style={{
          background: "#164460",
        }}
      >
        <h1>Palīdzi attīstīt latviešu valodas tehnoloģijas ar savu balsi!</h1>
        <div style={{ display: "flex" }}>
          <div>
            <p>Izaicinājums</p>
            <h2>Ierunāsim 100 stundas 4. maijā!</h2>
          </div>
          <div>
            <p>
              Latviešu <img src="/public/assets/images/svg/latvija.svg"></img>
            </p>
            <p>
              Igauņu<img src="/public/assets/images/svg/igaunu.svg"></img>
            </p>
            <p>
              Lietuviešu<img src="/public/assets/images/svg/lietuva.svg"></img>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
