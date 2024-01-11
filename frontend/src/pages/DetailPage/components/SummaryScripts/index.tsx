import { AiOutlineInfoCircle } from 'react-icons/ai';

import IconButton from '../../../../components/atoms/IconButton';
import Tooltip from '../../../../components/atoms/Tooltip';
import { SUMMARY_SCRIPTS_TOOLTIP } from '../../../../constants/tooltip';
import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { PropsWithClassName } from '../../../../types/utils';
import useSummaryScripts from '../../hooks/useSummaryScripts';
import useSummaryScriptsHighlight from '../../hooks/useSummaryScriptsHighlight';
import SummaryScript from '../SummaryScript';
import * as styles from './styles.css';

interface SummaryScriptsProps extends PropsWithClassName {
  videoId: string;
  onFetched: () => void;
}

const metaData = {
  head: { ko: '요약 스크립트', en: 'Summary Scripts' },
};

const SummaryScripts = ({ videoId, onFetched, className }: SummaryScriptsProps) => {
  const lang = useGlobalLangState();

  const summaryScripts = useSummaryScripts({ videoId, onFetched });
  const { highlightedId, updateHighlight } = useSummaryScriptsHighlight(summaryScripts);

  return (
    <section className={className}>
      <header className={styles.header}>
        <h3 className={styles.head}>{metaData.head[lang]}</h3>
        <div className={styles.options}>
          <Tooltip placement="bottom-end" text={SUMMARY_SCRIPTS_TOOLTIP[lang]}>
            <IconButton className={styles.icon} icon={<AiOutlineInfoCircle />} />
          </Tooltip>
        </div>
      </header>
      {summaryScripts?.map((summaryScript) => {
        const { id, fullScriptIds, startTime } = summaryScript;
        const isHighlighted = highlightedId === id;

        return (
          <SummaryScript
            summaryScript={summaryScript}
            onClick={() => {
              updateHighlight(fullScriptIds, id, startTime);
            }}
            isHighlighted={isHighlighted}
            key={summaryScript.id}
          />
        );
      })}
    </section>
  );
};

export default SummaryScripts;
