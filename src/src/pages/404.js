import React, {Component} from 'react'
import styled from 'styled-components'

const Div404 = styled.div`
  text-align: center;
  padding: 16px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  margin-top: 180px;
    h1 {
        margin: -10px 0 -30px;
        font-size: calc(17vw + 40px);
        opacity: .8;
        letter-spacing: -17px;
    }
    p {
        opacity: .8;
        font-size: 20px;
        margin: 8px 0 38px 0;
        font-weight: bold;
      }
`
export default () => {
    return (
        <Div404>
            <h1>404</h1>
            <p>We're sorry but it looks like that page doesn't exist anymore.</p>
        </Div404>
    )
}