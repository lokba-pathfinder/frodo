import * as styles from './styles.css';

interface VideoTitleProps {
  title: string;
}

const VideoTitle = ({ title }: VideoTitleProps) => <h2 className={styles.container}>{title}</h2>;

export default VideoTitle;
