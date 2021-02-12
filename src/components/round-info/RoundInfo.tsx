import React from 'react';
import { BoardState } from '../../models/BoardState';
import { SquareValue } from '../../models/SquareValue';
import './RoundInfo.css';

interface RoundInfoProps {
    boardState: BoardState;
    xIsNext: boolean;
    onWin: () => void;
    onReset: () => void;
}

export class RoundInfo extends React.Component<RoundInfoProps> {
    private displayReset: boolean;

    public constructor(props: RoundInfoProps) {
        super(props);

        this.displayReset = false;
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
        return !squares.find(square => square === undefined);
    }

    private getStatusText(): string {
        const winner = this.calculateWinner(this.props.boardState.squares);
        const openSpaces = this.stillOpenSpaces(this.props.boardState.squares);

        if (winner) {
            if (!this.displayReset) {
                this.displayReset = true;
                this.props.onWin();
            }

            return `Winner: ${winner}`;
        }
        else if (!openSpaces) {
            if (!this.displayReset) {
                this.displayReset = true;
            }

            return 'No winner';
        }
        else {
            return `Next player: ${this.props.xIsNext ? 'X' : 'O'}`;
        }
    }

    private getResetButton(): JSX.Element {
        const resetClicked = () => {
            this.displayReset = false;
            this.props.onReset();
        };

        return (
            <div>
                <button onClick={() => resetClicked()}>Reset</button>
            </div>
        );
    }

    render() {
        const status = this.getStatusText();
        const resetButton = this.displayReset ? this.getResetButton() : undefined;

        return (
            <div className="game-info">
                <div>{resetButton}</div>
                <div>{status}</div>
                <ol>{/* TODO */}</ol>
            </div>
        );
    }
}