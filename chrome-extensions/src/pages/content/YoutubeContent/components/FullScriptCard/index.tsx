import { FullScript, HighlightState } from '@src/configs/types';
import useGlobalLangState from '@src/pages/content/shared/hooks/useGlobalLangState';

interface FullScriptCardProps {
  fullScript: FullScript;
  highlighted: boolean;
  handleUpdate: (highlightState: HighlightState, startTime: number) => void;
}

const FullScriptCard = ({ fullScript, highlighted, handleUpdate }: FullScriptCardProps) => {
  const lang = useGlobalLangState();
  const { id, summaryScriptId, contents, startTime } = fullScript;

  const handleClick = () => {
    const highlightState = {
      summaryScriptId,
      fullScriptIds: [id],
    };
    handleUpdate(highlightState, startTime);
  };

  return (
    <section
      className={
        highlighted
          ? 'youtube-content__full-script-card--container highlighted'
          : 'youtube-content__full-script-card--container'
      }
    >
      <p className="youtube-content__full-script-card--item" onClick={handleClick}>
        {contents[lang]}
      </p>
    </section>
  );
};

export default FullScriptCard;
