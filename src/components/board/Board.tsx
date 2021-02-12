import React from 'react';
import { SquareValue } from '../../models/SquareValue';
import { Square } from '../square/Square';
import './Board.css';

interface BoardProps {
    squares: SquareValue[];
    onClick: (i: number) => void;
}

export class Board extends React.Component<BoardProps> {

    private renderSquare(i: number) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    public render(): JSX.Element {
        return (
            <div className="board">
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
