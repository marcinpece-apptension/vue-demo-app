import styled from 'vue-styled-components';

export const Container = styled.div`
  --bg-color: #fbfbff;
  --base-color: #c7c7c7;
  --active-color: #55828b;

  background-color: #fbfbff;
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
`;

export const Navigation = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-top: 90px;

  a {
    display: flex;
    font-size: 40px;
    text-decoration: none;
    margin-bottom: 30px;
    color: var(--base-color);
    align-items: baseline;
    font-weight: 400;
    transition: color .3s ease-in;

    &:before {
      content: '';
      display: block;
      width: 30px;
      transition: width .3s ease-in, background-color .3s ease-in;
      height: 1px;
      background-color: var(--base-color);
    }

    &.router-link-active {
      color: var(--active-color);

      &:before {
        width: 70px;
        background-color: var(--active-color);
      }
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  align-self: center;
`;