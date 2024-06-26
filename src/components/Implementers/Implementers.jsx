import { t } from "i18next";

const Implementers = (props) => {
  return (
    <section className="implementers">
      <div className="wrapper">
        <p className="implementers__title title">
          {t("index.implementersImplementers")}
        </p>
        <div className="implementers__logos">
          <img
            src="/assets/images/LUMII.png"
            alt="LUMII logo"
            width="282"
            height="160"
          />
          <img
            src="/assets/images/LULFMI.png"
            alt="LULFMI logo"
            width="282"
            height="160"
          />
          <img
            src="/assets/images/LATA.png"
            alt="LATA logo"
            width="282"
            height="160"
          />
          <img
            src="/assets/images/RTA.png"
            alt="RTA logo"
            width="282"
            height="160"
          />
          <img
            src="/assets/images/UnescoLV.png"
            alt="UnescoLV logo"
            width="282"
            height="160"
          />
        </div>
      </div>
      <div className="wrapper">
        <p className="implementers__title title">
          {t("index.implementersSupporters")}
        </p>
        <div className="implementers__logos">
          <img
            src="/assets/images/svg/DzDsv.svg"
            alt="DzDsv logo"
            width="282"
            height="160"
          />
          <img
            src="/assets/images/LNKC.png"
            alt="LNKC logo"
            width="282"
            height="160"
          />
          <img
            src="/assets/images/voluda.png"
            alt="LNKC logo"
            width="282"
            height="160"
          />
          <img
            src="/assets/images/svg/iesaisties.svg"
            alt="iesaisties"
            width="178"
            height="51"
          />
          <div className="vpp-logo">
            <img
              src="/assets/images/VPP.png"
              alt="VPP logo"
              width="282"
              height="160"
            />
            <span>
              "Mūsdienu latviešu valodas izpēte un valodas tehnoloģiju attīstība"<br/>
              Nr. VPP-LETONIKA-2021/1-0006
            </span>
          </div>
          <div className="vpp-logo">
            <img
              src="/assets/images/VPP.png"
              alt="VPP logo"
              width="282"
              height="160"
            />
            <span>
              Atvērtas un FAIR principiem atbilstīgas digitālo humanitāro zinātņu ekosistēmas attīstība Latvijā (DHELI)"<br/>
              Nr: VPP-IZM-DH-2022/1-0002
            </span>
          </div>
          <div className="es-logo">
            <img
              src="/assets/images/svg/ESLogo.svg"
              width="220"
              height="48"
              alt="ES atbalsta logo"
            />
            <span>
              Balsu talkas organizēšanu līdzfinansē Eiropas Savienības Atveseļošanas un noturības mehānisma investīcija un valsts budžets projekta “Valodu tehnoloģiju iniciatīva” (2.3.1.1.i.0/1/22/I/CFLA/002) ietvaros.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Implementers;
