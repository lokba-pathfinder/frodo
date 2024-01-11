import { MouseEventHandler, PropsWithChildren, useLayoutEffect, useRef, useState } from 'react';

import classNames from '../../../utils/classNames';
import * as styles from './styles.css';

export type Placement =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'left'
  | 'right'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

interface TooltipProps extends PropsWithChildren {
  placement?: Placement;
  text: string;
  initialActive?: boolean;
  className?: string;
}

interface TooltipState {
  top: number;
  left: number;
  active: boolean;
}

const getTooltipOffset = (container: HTMLElement, target: HTMLElement, placement: Placement) => {
  // container와 target 사이의 GAP(단위 : px)
  const GAP = 20;
  const { clientWidth: childrenWidth, clientHeight: childrenHeight } = container;
  const { clientWidth: tooltipWidth, clientHeight: tooltipHeight } = target;

  const OFFSET_TABLE: { [key in Placement]: { top: number; left: number } } = {
    'top-start': { top: -(tooltipHeight + GAP), left: 0 },
    'top-center': { top: -(tooltipHeight + GAP), left: (childrenWidth - tooltipWidth) / 2 },
    'top-end': { top: -(tooltipHeight + GAP), left: childrenWidth },
    left: { top: (childrenHeight - tooltipHeight) / 2, left: -(tooltipWidth + GAP) },
    right: { top: (childrenHeight - tooltipHeight) / 2, left: childrenWidth + GAP },
    'bottom-start': { top: childrenHeight + GAP, left: 0 },
    'bottom-center': { top: childrenHeight + GAP, left: (childrenWidth - tooltipWidth) / 2 },
    'bottom-end': { top: childrenHeight + GAP, left: childrenWidth - tooltipWidth },
  };

  return OFFSET_TABLE[placement];
};

const Tooltip = ({
  placement = 'top-center',
  text,
  initialActive = false,
  className,
  children,
}: TooltipProps) => {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    top: 0,
    left: 0,
    active: initialActive,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const tooltipTextStyle = tooltipState.active
    ? styles.tooltipText.active
    : styles.tooltipText.default;

  const handleMouseEnter: MouseEventHandler<HTMLElement> = (e) => {
    if ((e.target as HTMLElement) === targetRef.current) return;

    setTooltipState((prev) => ({ ...prev, active: true }));
  };

  const handleMouseLeave: MouseEventHandler<HTMLElement> = () => {
    setTooltipState((prev) => ({ ...prev, active: false }));
  };

  useLayoutEffect(() => {
    if (
      containerRef.current === null ||
      targetRef.current === null ||
      tooltipState.active === false
    )
      return;

    const { top, left } = getTooltipOffset(containerRef.current, targetRef.current, placement);
    setTooltipState((prev) => ({ ...prev, top, left }));
  }, [placement, tooltipState.active, text]);

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {children}
      <div
        className={classNames(tooltipTextStyle, className)}
        style={{ top: tooltipState.top, left: tooltipState.left }}
        ref={targetRef}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
