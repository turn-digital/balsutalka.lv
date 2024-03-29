import { t } from "i18next";

const ProgressSvg = ({ hours }) => {
  const goal = Number(t("index.graphGoal"))
  // 501 - progress bar image width
  const progressWidth = Math.min(hours, goal) / goal * 501;

  return(
    <svg width="501" height="48" viewBox="0 0 501 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="500" transform="translate(500 3.00002) rotate(90)" fill="white" fillOpacity="0.25" />
      <rect x="0" y="3" width={ progressWidth } height="40" fill="#58C8B2" />
      <text x={ progressWidth - String(Number(hours).toFixed(1)).length * 8 } y="29" fontSize="14px" fill="white">
        { Number(hours).toFixed(1) }
      </text>
      {/*Default is 18*/}
      <mask id="path-2-inside-1_137_1828" fill="white">
        <path d="M500 0H501V48H500V0Z" />
      </mask>
      <path
        d="M501.5 48V47H500.5V48H501.5ZM501.5 45V43H500.5V45H501.5ZM501.5 41V39H500.5V41H501.5ZM501.5 37V35H500.5V37H501.5ZM501.5 33V31H500.5V33H501.5ZM501.5 29V27H500.5V29H501.5ZM501.5 25V23H500.5V25H501.5ZM501.5 21V19H500.5V21H501.5ZM501.5 17V15H500.5V17H501.5ZM501.5 13V11H500.5V13H501.5ZM501.5 9V7H500.5V9H501.5ZM501.5 5V3H500.5V5H501.5ZM501.5 0.999999V0H500.5V0.999999H501.5ZM502 48V47H500V48H502ZM502 45V43H500V45H502ZM502 41V39H500V41H502ZM502 37V35H500V37H502ZM502 33V31H500V33H502ZM502 29V27H500V29H502ZM502 25V23H500V25H502ZM502 21V19H500V21H502ZM502 17V15H500V17H502ZM502 13V11H500V13H502ZM502 9V7H500V9H502ZM502 5V3H500V5H502ZM502 0.999999V0H500V0.999999H502Z"
        fill="white" fillOpacity="0.5" mask="url(#path-2-inside-1_137_1828)" />
      <mask id="path-4-inside-2_137_1828" fill="white">
        <path d="M0 0H1V48H0V0Z" />
      </mask>
      <path
        d="M1.5 48V47H0.5V48H1.5ZM1.5 45V43H0.5V45H1.5ZM1.5 41V39H0.5V41H1.5ZM1.5 37V35H0.5V37H1.5ZM1.5 33V31H0.5V33H1.5ZM1.5 29V27H0.5V29H1.5ZM1.5 25V23H0.5V25H1.5ZM1.5 21V19H0.5V21H1.5ZM1.5 17V15H0.5V17H1.5ZM1.5 13V11H0.5V13H1.5ZM1.5 9V7H0.5V9H1.5ZM1.5 5V3H0.5V5H1.5ZM1.5 0.999999V0H0.5V0.999999H1.5ZM2 48V47H0V48H2ZM2 45V43H0V45H2ZM2 41V39H0V41H2ZM2 37V35H0V37H2ZM2 33V31H0V33H2ZM2 29V27H0V29H2ZM2 25V23H0V25H2ZM2 21V19H0V21H2ZM2 17V15H0V17H2ZM2 13V11H0V13H2ZM2 9V7H0V9H2ZM2 5V3H0V5H2ZM2 0.999999V0H0V0.999999H2Z"
        fill="white" fillOpacity="0.5" mask="url(#path-4-inside-2_137_1828)" />
      <mask id="path-6-inside-3_137_1828" fill="white">
        <path d="M125 0H126V48H125V0Z" />
      </mask>
      <path
        d="M126.5 48V47H125.5V48H126.5ZM126.5 45V43H125.5V45H126.5ZM126.5 41V39H125.5V41H126.5ZM126.5 37V35H125.5V37H126.5ZM126.5 33V31H125.5V33H126.5ZM126.5 29V27H125.5V29H126.5ZM126.5 25V23H125.5V25H126.5ZM126.5 21V19H125.5V21H126.5ZM126.5 17V15H125.5V17H126.5ZM126.5 13V11H125.5V13H126.5ZM126.5 9V7H125.5V9H126.5ZM126.5 5V3H125.5V5H126.5ZM126.5 0.999999V0H125.5V0.999999H126.5ZM127 48V47H125V48H127ZM127 45V43H125V45H127ZM127 41V39H125V41H127ZM127 37V35H125V37H127ZM127 33V31H125V33H127ZM127 29V27H125V29H127ZM127 25V23H125V25H127ZM127 21V19H125V21H127ZM127 17V15H125V17H127ZM127 13V11H125V13H127ZM127 9V7H125V9H127ZM127 5V3H125V5H127ZM127 0.999999V0H125V0.999999H127Z"
        fill="white" fillOpacity="0.5" mask="url(#path-6-inside-3_137_1828)" />
      <mask id="path-8-inside-4_137_1828" fill="white">
        <path d="M250 0H251V48H250V0Z" />
      </mask>
      <path
        d="M251.5 48V47H250.5V48H251.5ZM251.5 45V43H250.5V45H251.5ZM251.5 41V39H250.5V41H251.5ZM251.5 37V35H250.5V37H251.5ZM251.5 33V31H250.5V33H251.5ZM251.5 29V27H250.5V29H251.5ZM251.5 25V23H250.5V25H251.5ZM251.5 21V19H250.5V21H251.5ZM251.5 17V15H250.5V17H251.5ZM251.5 13V11H250.5V13H251.5ZM251.5 9V7H250.5V9H251.5ZM251.5 5V3H250.5V5H251.5ZM251.5 0.999999V0H250.5V0.999999H251.5ZM252 48V47H250V48H252ZM252 45V43H250V45H252ZM252 41V39H250V41H252ZM252 37V35H250V37H252ZM252 33V31H250V33H252ZM252 29V27H250V29H252ZM252 25V23H250V25H252ZM252 21V19H250V21H252ZM252 17V15H250V17H252ZM252 13V11H250V13H252ZM252 9V7H250V9H252ZM252 5V3H250V5H252ZM252 0.999999V0H250V0.999999H252Z"
        fill="white" fillOpacity="0.5" mask="url(#path-8-inside-4_137_1828)" />
      <mask id="path-10-inside-5_137_1828" fill="white">
        <path d="M375 0H376V48H375V0Z" />
      </mask>
      <path
        d="M376.5 48V47H375.5V48H376.5ZM376.5 45V43H375.5V45H376.5ZM376.5 41V39H375.5V41H376.5ZM376.5 37V35H375.5V37H376.5ZM376.5 33V31H375.5V33H376.5ZM376.5 29V27H375.5V29H376.5ZM376.5 25V23H375.5V25H376.5ZM376.5 21V19H375.5V21H376.5ZM376.5 17V15H375.5V17H376.5ZM376.5 13V11H375.5V13H376.5ZM376.5 9V7H375.5V9H376.5ZM376.5 5V3H375.5V5H376.5ZM376.5 0.999999V0H375.5V0.999999H376.5ZM377 48V47H375V48H377ZM377 45V43H375V45H377ZM377 41V39H375V41H377ZM377 37V35H375V37H377ZM377 33V31H375V33H377ZM377 29V27H375V29H377ZM377 25V23H375V25H377ZM377 21V19H375V21H377ZM377 17V15H375V17H377ZM377 13V11H375V13H377ZM377 9V7H375V9H377ZM377 5V3H375V5H377ZM377 0.999999V0H375V0.999999H377Z"
        fill="white" fillOpacity="0.5" mask="url(#path-10-inside-5_137_1828)" />
    </svg>
  )
};

export default ProgressSvg;
