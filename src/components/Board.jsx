import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import Cell from './Cell';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

const Board = () => {
    const SIZE = 12;
    const [layout, setLayout] = useState(Array(SIZE * SIZE).fill(null));
    const [symbolLayout, setSymbolLayout] = useState(Array(SIZE * SIZE).fill(null));
    const [whiteTurn, setWhiteTurn] = useState(false);
    const [gameEnds, setGameEnds] = useState(false);
    const [message, setMessage] = useState('Turn: Black')
    const [currIndex, setCurrIndex] = useState(null)
    const [winMessage, setWinMessage] = useState('')

    const setSymbol = (tracking) => {
        const newSymbolLayout = [...symbolLayout]
        tracking.forEach((num) => {
            newSymbolLayout[num] = 10;
        })
        setSymbolLayout(newSymbolLayout)
    }

    const isWining = (index) => {
        const matrix = new Array(SIZE).fill(null).map(() => new Array(SIZE).fill(null));

        for (let i = 0; i < SIZE * SIZE; i++) {
            matrix[Math.floor(i / SIZE)][i % SIZE] = layout[i]
        }
        const row = Math.floor(index / SIZE);
        const col = index % SIZE;
        //test horizontal
        let tracking = []
        let c1 = col;
        let c2 = col;
        while (c1 >= 0 && matrix[row][c1] === layout[index]) {
            tracking.push(row * SIZE + c1)
            c1 -= 1;
        }
        while (c2 < SIZE && matrix[row][c2] === layout[index]) {
            tracking.push(row * SIZE + c2)
            c2 += 1;
        }
        if (c2 - c1 - 1 == 5) {
            setSymbol(tracking);
            return true;
        }
        //test vertical
        tracking = []
        let r1 = row;
        let r2 = row;
        while (r1 >= 0 && matrix[r1][col] === layout[index]) {
            tracking.push(r1 * SIZE + col)
            r1 -= 1;
        }
        while (r2 < SIZE && matrix[r2][col] === layout[index]) {
            tracking.push(r2 * SIZE + col)
            r2 += 1;
        }
        if (r2 - r1 - 1 == 5) {
            setSymbol(tracking);
            return true;
        }
        //test diagnal
        c1 = col;
        c2 = col;
        r1 = row;
        r2 = row;
        tracking = []
        while (r1 >= 0 && c1 >= 0 && matrix[r1][c1] === layout[index]) {
            tracking.push(r1 * SIZE + c1)
            r1 -= 1;
            c1 -= 1;
        }
        while (r2 < SIZE && c2 < SIZE && matrix[r2][c2] === layout[index]) {
            tracking.push(r2 * SIZE + c2)
            r2 += 1;
            c2 += 1;
        }
        if (c2 - c1 - 1 == 5) {
            setSymbol(tracking);
            return true;
        }
        //test anti-diagnal
        c1 = col;
        c2 = col;
        r1 = row;
        r2 = row;
        tracking = []
        while (r1 >= 0 && c1 < SIZE && matrix[r1][c1] === layout[index]) {
            tracking.push(r1 * SIZE + c1)
            r1 -= 1;
            c1 += 1;
        }
        while (r2 < SIZE && c2 >= 0 && matrix[r2][c2] === layout[index]) {
            tracking.push(r2 * SIZE + c2)
            r2 += 1;
            c2 -= 1;
        }
        if (c1 - c2 - 1 == 5) {
            setSymbol(tracking);
            return true;
        }
    }

    useEffect(() => {
        if (isWining(currIndex)) {
            setGameEnds(true)
            setWinMessage(!whiteTurn ? 'White Wins!' : 'Black Wins!')
            return
        }
        setMessage(whiteTurn ? 'Turn: White' : 'Turn: Black')
    }, [currIndex])


    const handleClick = (i) => {
        if (gameEnds || layout[i] === 1 || layout[i] === 0) return
        const newLayout = [...layout];
        newLayout[i] = whiteTurn ? 0 : 1;
        setLayout(newLayout);
        setCurrIndex(i)
        setWhiteTurn(!whiteTurn)
    }

    const handleRestart = () => {
        setLayout(Array(SIZE * SIZE).fill(null))
        setSymbolLayout(Array(SIZE * SIZE).fill(null))
        setWhiteTurn(false)
        setGameEnds(false)
        setMessage('Turn: Black')
        setCurrIndex(null)
        setWinMessage('')
    }

    const style = whiteTurn ? { color: 'black', marginBottom: '15px' } : { color: 'white', marginBottom: '15px' };

    return (
        <Border>
            <Toast show={false} onClose={true}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast>
            <Title>
                {!gameEnds ? <h4>{message}</h4> : <h2 style={style}>{winMessage}</h2>}


                <Button variant="outline-secondary" onClick={handleRestart}>Restart</Button>
            </Title>
            <Container>
                {layout.map((num, i) => {
                    return (
                        <div
                            key={i}
                            onClick={() => handleClick(i)}
                        >
                            <Cell piece={num} whiteTurn={whiteTurn} gameEnds={gameEnds} symbol={symbolLayout[i]} />
                        </div>
                    )


                })}
            </Container>
        </Border>
    )
}

export default Board


const Border = styled.div`
    width: 100vw;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin: 10px;
`;

const Title = styled.div`
    width: 600px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 10px;

`;

const Container = styled.div`
    width: 100vw;
    
    display: grid;
    justify-content: center;
    align-content: center;
    grid-template-columns: repeat(12, auto);
`;
