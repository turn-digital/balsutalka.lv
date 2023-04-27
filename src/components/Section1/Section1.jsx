const Section1 = (props) => {
  console.log("Section1");
  return (
    <>
      <div>
        <h1>Ieguldi latviešu valodas nākotnē!</h1>
        <div style={{ display: "flex" }}>
          <div>
            <h1>Runā</h1>
            <p>
              Ziedo savu balsi līdzās tūkstošiem citu! Jo vairāk un
              daudzveidīgāki būs balsu paraugi, jo ātrāk un veiksmīgāk izdosies
              attīstīt runas tehnoloģijas latviešu valodā!
            </p>
            <img src="/public/assets/images/svg/mic.svg"></img>
          </div>
          <div>
            <h1>Klausies</h1>
            <p>
              Palīdzi novērtēt, kā ierunājuši citi! Ierakstu apstiprināšana ir
              vienlīdz svarīga, lai radītu kvalitatīvus un atvērtus runas datus.
            </p>
            <img src="/public/assets/images/svg/listen.svg"></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section1;
