import Header from '@src/pages/content/shared/components/Header';
import { PropsWithChildren } from 'react';

const YoutubeContentContainer = ({ children }: PropsWithChildren) => (
  <div className="youtube-content__container">
    <Header />
    <div className="youtube-content__container--contents">{children}</div>
  </div>
);

export default YoutubeContentContainer;
