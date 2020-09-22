import styled, { css } from 'vue-styled-components';
import { cond, always, propEq, T } from 'ramda';

export const Title = styled.h1`
  font-size: 90px;
  font-weight: 600;
  letter-spacing: -.04em;
  position: relative;
  line-height: 1em;
  margin: 0 0 40px 0;
`;

export const TitleBase = styled.span`
  display: inline-block;
  color: var(--base-color);
`;

export const TitleTarget = styled.span`
  display: inline-block;
  position: relative;
  padding-left: 20px;
  top: 20px;
  color: var(--active-color);

  :before {
    content: '';
    position: absolute;
    height: 1px;
    width: 250px;
    background-color: var(--active-color);
    transform:  translate(-130px, 30px) rotate(-35deg);
  }
`;

export const Chart = styled.div``;

export const LegendLabel = styled.text`
  font-weight: 400;
  text-anchor: end;
  font-size: 20px;
  fill: var(--active-color);
`;

export const LegendLine = styled.line`
  stroke: var(--active-color);
  stroke-width: 1;
  shape-rendering: crispEdges;
`;

export const CurrentValueLabel = styled.text`
  font-weight: 600;
  font-size: 30px;
  fill: var(--active-color);
`;

export const CurrencyLabel = styled.tspan`
  font-weight: 400;
  font-size: 20px;
  fill: var(--base-color);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin 0 auto;
  width: 600px;
`;

export const FilterList = styled.div`
  margin: 40px 0 40px 40px;
  display: flex;
  align-items: center;
  color: var(--base-color);
  font-weight: 600;
`;

const filterItemProps = {
  isActive: Boolean,
};

export const FilterItem = styled('div', filterItemProps)`
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
  transition: border .3s, color .3s;

  ${cond([
    [propEq('isActive', true), always(css`
      border: 1px solid var(--active-color);
      color: var(--active-color);
    `)],
    [T, always(css`
      border: 1px solid var(--base-color);
      color: var(--base-color);
    `)]
  ])}

`;
