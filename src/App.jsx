import React from 'react'
import Board from './components/Board'
import styled from "styled-components";

const App = () => {
    return (
        <Container>
            <h1 style={{ letterSpacing: '20px', margin: '20px', paddingLeft: '10px' }}>GOMOKU</h1>
            <SimpleRule>
                <Text>Players taking black and white respectively.</Text>
                <Text>Achieving five continuous pieces of your color to win.</Text>
            </SimpleRule>
            <Board />
            <Rules><strong>Rules :</strong> Players alternate turns placing a stone of their color on an empty intersection. Black plays first. The winner is the first player to form an unbroken chain of five stones horizontally, vertically, or diagonally. Placing so that a line of more than five stones of the same color is created does not result in a win. These are called overlines.</Rules>
        </Container >
    )
}

export default App

const Container = styled.div`
    display: flex;
    
    flex-direction: column;
    justify-content: space-around; 
    align-items: center;
    background-color: #e6ceae;
`;

const Rules = styled.div`
    font-size: small;
    width: 600px;
    min-height: 100px;
    margin: 10px;
`;

const SimpleRule = styled.div`
    display: flex; 
    align-items: center;
    flex-direction: column;
    font-size: small;
    width: 600px;
`;

const Text = styled.div`
    margin: 0px;
`;