import { AiOutlineInfoCircle } from 'react-icons/ai';

import IconButton from '../../../../components/atoms/IconButton';
import Tooltip from '../../../../components/atoms/Tooltip';
import { FULL_SCRIPTS_TOOLTIP } from '../../../../constants/tooltip';
import useGlobalLangState from '../../../../hooks/useGlobalLangState';
import { PropsWithClassName } from '../../../../types/utils';
import classNames from '../../../../utils/classNames';
import { formatTime } from '../../../../utils/format';
import useFullScripts from '../../hooks/useFullScripts';
import useFullScriptsHighlight from '../../hooks/useFullScriptsHighlight';
import * as styles from './styles.css';

interface FullScriptsProps extends PropsWithClassName {
  videoId: string;
  onFetched: () => void;
}

const metaData = {
  head: { ko: '전체 스크립트', en: 'Full Scripts' },
};

const FullScripts = ({ videoId, onFetched, className }: FullScriptsProps) => {
  const lang = useGlobalLangState();

  const fullScripts = useFullScripts({ videoId, onFetched });
  const { highlightedIds, updateHighlight } = useFullScriptsHighlight(fullScripts);

  return (
    <article className={className}>
      <header className={styles.header}>
        <h3 className={styles.head}>{metaData.head[lang]}</h3>
        <div className={styles.options}>
          <Tooltip placement="bottom-end" text={FULL_SCRIPTS_TOOLTIP[lang]}>
            <IconButton className={styles.icon} icon={<AiOutlineInfoCircle />} />
          </Tooltip>
        </div>
      </header>
      {fullScripts?.map(({ id, summaryScriptId, startTime, contents }) => (
        <div
          className={classNames(styles.fullScript, [
            styles.highlighted,
            highlightedIds.includes(id),
          ])}
          onClick={() => updateHighlight(id, summaryScriptId, startTime)}
          key={id}
          role="button"
          tabIndex={0}
        >
          <div className={styles.startTime}>{formatTime(startTime)}</div>
          <p className={styles.contents}>{contents[lang]}</p>
        </div>
      ))}
    </article>
  );
};

export default FullScripts;
