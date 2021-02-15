import React from 'react';
import { BoardState } from '../../models/BoardState';
import './GameHistory.css';

interface GameHistoryProps {
    history: BoardState[];
    onJump: (step: number, xIsNext: boolean) => void;
}

export class GameHistory extends React.Component<GameHistoryProps> {

    private jumpTo(stepIndex: number): void {
        this.props.onJump(stepIndex, (stepIndex % 2) === 0);
    }

    public render(): JSX.Element {
        const moves = this.props.history.map((step, stepIndex) => {
            const desc = stepIndex ? 'Go to move #' + stepIndex : 'Go to game start';

            return (
                <li key={stepIndex}>
                    <button onClick={() => this.jumpTo(stepIndex)}>{desc}</button>
                </li>
            );
        });

        return (<div>{moves}</div>);
    }
}