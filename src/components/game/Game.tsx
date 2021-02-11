import React from 'react';
import { Board } from '../board/Board';
// import { RoundInfo } from '../round-info/RoundInfo';
import './Game.css';

export class Game extends React.Component {
    render() {
        return (
            <div className="game">
                {/* <div>
                    <RoundInfo />
                </div> */}

                <div className="game-board">
                    <Board />
                </div>

                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}