import SummaryScript from '.';
import { summaryScripts } from '../../../../mocks/data/detail';
import type { Meta } from '@storybook/react';

const meta = {
  title: 'pages/DetailPage/SummaryScript',
  component: SummaryScript,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof SummaryScript>;

export default meta;

export const Default = () => <SummaryScript summaryScript={summaryScripts[1]} onClick={() => {}} />;

export const Highlighted = () => (
  <SummaryScript summaryScript={summaryScripts[0]} onClick={() => {}} isHighlighted />
);
