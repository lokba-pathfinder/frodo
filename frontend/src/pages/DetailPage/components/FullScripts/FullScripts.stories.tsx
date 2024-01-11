import FullScripts from '.';
import { videoId } from '../../../../mocks/data/detail';
import detailHandler from '../../../../mocks/handlers/detailHandler';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'pages/DetailPage/FullScripts',
  component: FullScripts,
  parameters: {
    layout: 'centered',
    msw: {
      handlers: [detailHandler],
    },
  },
  argTypes: {},
} satisfies Meta<typeof FullScripts>;

export default meta;

export const Default = () => <FullScripts videoId={videoId} onFetched={() => {}} />;
