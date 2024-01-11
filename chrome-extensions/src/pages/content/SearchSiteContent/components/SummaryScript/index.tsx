import { SummaryScript as SummaryScripType } from '@src/configs/types';
import monitor from '../../../../../assets/monitor.png';
import { PINNECT_AI_URL } from '@src/configs/constants';
import useGlobalLangState from '@src/pages/content/shared/hooks/useGlobalLangState';

interface SummaryScriptProps {
  summaryScript: SummaryScripType;
}

const SummaryScript = ({ summaryScript }: SummaryScriptProps) => {
  const lang = useGlobalLangState();
  const { title, lines } = summaryScript.contents[lang];

  return (
    <div className="summaryScript-container">
      <div className="summaryScript-header">
        <h1>{title}</h1>
        <a
          href={`${PINNECT_AI_URL}/detail/${summaryScript.videoId}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={monitor} alt="navigate to a Pinnect.ai" />
        </a>
      </div>
      <ul className="summaryScript-list">
        {lines.map((description, lineNo) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={lineNo} className="summaryScript-item">
            {description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SummaryScript;
