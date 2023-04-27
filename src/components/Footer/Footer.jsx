const Footer = (props) => {
  console.log("footer1");
  return (
    <>
      <div className="footer">
        <img
          className="footer_logo"
          src="/assets/images/svg/LogoFooter.svg"
        ></img>
        <p className="footer_text">
          © balsutalka.lv, 2023. Visas tiesības aizsargātas
        </p>
      </div>
    </>
  );
};

export default Footer;
