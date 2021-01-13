import React from 'react';
import { SquareValue } from './models/SquareValue';
import { Square } from './square';

interface State {
    squares: SquareValue[];
    xIsNext: boolean;
    winnerDeclared: boolean;
}

interface Properties { }

export class Board extends React.Component {
    state: State;

    currentSymbol = 'X';

    constructor(props: Properties) {
        super(props);

        this.state = {
            squares: Array(9).fill(undefined),
            xIsNext: true,
            winnerDeclared: false,
        };
    }

    renderSquare(i: number) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    handleReset() {
        this.setState({
            squares: Array(9).fill(undefined),
            xIsNext: true,
            winnerDeclared: false,
        });
    }

    private handleClick(i: number): void {
        if (this.state.winnerDeclared) {
            return;
        }

        const squares = this.state.squares.slice();

        if (squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    private calculateWinner(squares: ('X' | 'O' | undefined)[]): SquareValue {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0, len = winningLines.length; i < len; i++) {
            const line = winningLines[i];
            const isWinner = line.every(square => squares[square] && squares[square] === squares[line[0]]);

            if (isWinner) {
                return squares[line[0]];
            }
        }

        return undefined;
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);

        let status = undefined;

        if (winner) {
            status = `Winner: ${winner}`;
        }
        else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        if (winner && !this.state.winnerDeclared) {
            this.setState({ winnerDeclared: true });
        }

        let resetButton;
        if (this.state.winnerDeclared) {
            resetButton = (
                <div>
                    <button onClick={() => this.handleReset()}>Reset</button>
                </div>
            )
        }

        return (
            <div>
                {resetButton}
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}
