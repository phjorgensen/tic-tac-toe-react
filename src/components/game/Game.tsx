import React from 'react';
import { BoardState } from '../../models/BoardState';
import { Board } from '../board/Board';
import { RoundInfo } from '../round-info/RoundInfo';
import './Game.css';


interface GameProps { }

interface GameState {
    history: BoardState[];
    xIsNext: boolean;
    win: boolean;
}


export class Game extends React.Component<GameProps, GameState> {

    constructor(props: GameProps) {
        super(props);

        this.state = {
            history: [
                {
                    squares: Array(9).fill(undefined),
                },
            ],
            xIsNext: true,
            win: false,
        };
    }

    private handleClick(i: number): void {
        if (this.state.win) {
            return;
        }

        const current = this.getCurrentBoardState();

        if (current.squares[i]) {
            return;
        }

        const squares = current.squares.slice();

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: this.state.history.concat([{ squares }]),
            xIsNext: !this.state.xIsNext,
        });
    }

    private handleWin() {
        this.setState({
            win: true,
        });
    }

    private handleReset() {
        this.setState({
            history: [
                {
                    squares: Array(9).fill(undefined),
                },
            ],
            xIsNext: true,
            win: false,
        });
    }

    private getCurrentBoardState(): BoardState {
        const history = this.state.history;

        return history[history.length - 1]
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];

        return (
            <div>
                <div className="game">
                    <div>
                        <RoundInfo boardState={current} xIsNext={this.state.xIsNext} onWin={() => this.handleWin()} onReset={() => this.handleReset()} />
                    </div>

                    <div>
                        <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                    </div>
                </div>
            </div>
        );
    }
}