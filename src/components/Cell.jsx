import React, { useState } from 'react'
import styled, { keyframes } from "styled-components";

const shadowSize = '50px'
const cellSize = '60px'

const enlarge = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1.1);
  }
`;

const appear = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1.7);
  }
`;


const Container = styled.div`
    box-sizing: border-box;
    width: ${cellSize};
    height: ${cellSize};
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e6ceae;
    transition: transform ease-in-out 1s;
`;

const Horizontal = styled.div`
    position: absolute;
    height: 2px;
    width: ${cellSize};
    background-color: black;
`;

const Vertical = styled.div`
    position: absolute;
    height: ${cellSize};
    width: 2px;
    background-color: black;
`;


const BlackPiece = styled.div`

    height: ${shadowSize};
    width: ${shadowSize};
    background-color: black;
    border-radius: 50%;
    z-index: 10;
    transform: scale(1.1);
    animation: ${enlarge} 300ms ease-out;
`;

const LightBlackPiece = styled.div`

    height: ${shadowSize};
    width: ${shadowSize};
    background-color: rgba(0,0,0,0.2);
    border-radius: 50%;
    z-index: 10;
`;

const WhitePiece = styled.div`
    box-sizing: border-box;
    height: ${shadowSize};
    width: ${shadowSize};
    background-color: White;
    border-radius: 50%;
    z-index: 10;
    transform: scale(1.1);
    animation: ${enlarge} 300ms ease-out;
`;

const LightWhitePiece = styled.div`
    box-sizing: border-box;
    height: ${shadowSize};
    width: ${shadowSize};
    background-color: rgba(255,255,255,0.4);
    border-radius: 50%;
    z-index: 10;
`;

const SymbolWhite = styled.div`
    position: absolute;
    z-index: 15;
    color: red;
    transform: scale(1.7);
    animation: ${appear} 300ms ease-out;
    margin-bottom: 5px;
`;


const Cell = ({ piece, whiteTurn, gameEnds, symbol }) => {
    const [show, setShow] = useState(null)
    return (
        <Container
            onMouseEnter={() => { if (!gameEnds && piece === null) whiteTurn ? setShow(2) : setShow(3) }}
            onMouseLeave={() => { setShow(null) }}>
            <Horizontal />
            <Vertical />

            {piece === 0 ? <WhitePiece /> : null}
            {piece === 1 ? <BlackPiece /> : null}


            {symbol === 10 ? <SymbolWhite>+</SymbolWhite> : null}

            {piece === null && show === 2 ? <LightWhitePiece /> : null}
            {piece === null && show === 3 ? <LightBlackPiece /> : null}

        </Container>
    )
}

export default Cell 