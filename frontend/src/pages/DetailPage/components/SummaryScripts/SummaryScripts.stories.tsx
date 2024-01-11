import SummaryScripts from '.';
import { videoId } from '../../../../mocks/data/detail';
import detailHandler from '../../../../mocks/handlers/detailHandler';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'pages/DetailPage/SummaryScripts',
  component: SummaryScripts,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [detailHandler],
    },
  },
  argTypes: {},
} satisfies Meta<typeof SummaryScripts>;

export default meta;

export const Default = () => <SummaryScripts videoId={videoId} onFetched={() => {}} />;
