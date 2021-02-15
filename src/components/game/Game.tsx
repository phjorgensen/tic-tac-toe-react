import React from 'react';
import { BoardState } from '../../models/BoardState';
import { Board } from '../board/Board';
import { GameHistory } from '../game-history/GameHistory';
import { RoundInfo } from '../round-info/RoundInfo';
import './Game.css';


interface GameProps { }

interface GameState {
    history: BoardState[];
    xIsNext: boolean;
    stepIndex: number;
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
            stepIndex: 0,
            win: false,
        };
    }

    private handleClick(i: number): void {
        const history = this.state.history.slice(0, this.state.stepIndex + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.state.win || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{ squares }]),
            stepIndex: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    private handleWin(): void {
        this.setState({
            win: true,
        });
    }

    private handleJump(stepIndex: number, xIsNext: boolean): void {
        this.setState({
            stepIndex,
            xIsNext,
        });
    }

    private handleReset(): void {
        this.setState({
            history: [
                {
                    squares: Array(9).fill(undefined),
                },
            ],
            xIsNext: true,
            stepIndex: 0,
            win: false,
        });
    }

    public render(): JSX.Element {
        const history = this.state.history;
        const current = history[this.state.stepIndex];

        return (
            <div>
                <div className="game">
                    <div>
                        <GameHistory history={history} onJump={(step, xIsNext) => this.handleJump(step, xIsNext)} />
                    </div>

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