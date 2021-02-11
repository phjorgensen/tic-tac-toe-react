import { SquareValue } from "../../models/SquareValue";
import './Square.css';

interface Properties {
    onClick: () => void;
    value: SquareValue;
}

export function Square(props: Properties) {
    return (
        <button className="square" onClick={props.onClick}>{props.value}</button>
    );
}