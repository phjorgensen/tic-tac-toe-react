import React from 'react';
import { SquareValue } from './models/SquareValue';
import { Square } from './square';

interface State {
    squares: SquareValue[];
    xIsNext: boolean;
    displayReset: boolean;
}

interface Properties { }

export class Board extends React.Component {
    public state: State;

    public constructor(props: Properties) {
        super(props);

        this.state = {
            squares: Array(9).fill(undefined),
            xIsNext: true,
            displayReset: false,
        };
    }

    private renderSquare(i: number) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    private handleReset() {
        this.setState({
            squares: Array(9).fill(undefined),
            xIsNext: true,
            displayReset: false,
        });
    }

    private handleClick(i: number): void {
        if (this.state.displayReset) {
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

    private calculateWinner(squares: SquareValue[]): SquareValue {
        const winningLines: number[][] = [
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

    private stillOpenSpaces(squares: SquareValue[]): boolean {
        for (const square of squares) {
            if (square === undefined) {
                return true;
            }
        }

        return false;
    }

    private getStatusText(): string {
        const winner = this.calculateWinner(this.state.squares);
        const openSpaces = this.stillOpenSpaces(this.state.squares);

        if (winner) {
            if (!this.state.displayReset) {
                this.setState({ displayReset: true });
            }

            return `Winner: ${winner}`;
        }
        else if (!openSpaces) {
            if (!this.state.displayReset) {
                this.setState({ displayReset: true });
            }

            return 'No winner';
        }
        else {
            return `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
    }

    private getResetButton(): JSX.Element {
        return (
            <div>
                <button onClick={() => this.handleReset()}>Reset</button>
            </div>
        );
    }

    public render(): JSX.Element {
        const status = this.getStatusText();
        // const resetButton = this.getResetButton();

        return (
            <div>
                {this.state.displayReset ? this.getResetButton() : undefined}
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
