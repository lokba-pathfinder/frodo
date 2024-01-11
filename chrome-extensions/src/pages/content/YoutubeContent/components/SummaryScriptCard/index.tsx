import { HighlightState, SummaryScript } from '@src/configs/types';
import useGlobalLangState from '@src/pages/content/shared/hooks/useGlobalLangState';

interface SummaryScriptCardProps {
  summaryScript: SummaryScript;
  highlighted: boolean;
  handleUpdate: (highlightState: HighlightState, startTime: number) => void;
}

const SummaryScriptCard = ({
  summaryScript,
  highlighted,
  handleUpdate,
}: SummaryScriptCardProps) => {
  const lang = useGlobalLangState();
  const { id, fullScriptIds, startTime, contents } = summaryScript;
  const { title, lines } = contents[lang];

  const handleClick = () => {
    const highlightState = {
      summaryScriptId: id,
      fullScriptIds: [...fullScriptIds],
    };
    handleUpdate(highlightState, startTime);
  };

  return (
    <section
      className={
        highlighted
          ? 'youtube-content__summary-script-card--container highlighted'
          : 'youtube-content__summary-script-card--container'
      }
    >
      <h1 className="youtube-content__summary-script-card--title" onClick={handleClick}>
        {title}
      </h1>
      <ul className="youtube-content__summary-script-card--items">
        {lines.map((description, lineNo) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="youtube-content__summary-script-card--item" key={lineNo}>
            {description}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SummaryScriptCard;
