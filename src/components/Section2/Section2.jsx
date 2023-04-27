const Section2 = (props) => {
  console.log("Section1");
  return (
    <>
      <div>
        <h1>Palīdzi attīstīt latviešu valodas tehnoloģijas ar savu balsi!</h1>
        <div style={{ display: "flex" }}>
          <div>
            <p>Izaicinājums</p>
            <h3>Ierunāsim 100 stundas 4. maijā! </h3>
          </div>
          <div>
            <p>
              Latviešu<span> BORDER </span>18 stundas
            </p>
            <p>
              Igauņu<span> BORDER </span>56 stundas
            </p>
            <p>
              Lietuviešu<span> BORDER </span>54 stundas
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
