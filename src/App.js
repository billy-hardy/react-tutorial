import React, { Component } from 'react';

function Square(props) {
    let value = props.value || "\xa0";
    return (
        <button className="square" onClick={() => props.onClick()} >
        {value}
        </button>
    );
}

class Board extends Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        return (
            <div>
            <div>
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

class Game extends Component {
    constructor() {
        super();
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    xIsNext: true,
                }
            ],
            current: 0
        };
    }
    
    handleClick(i) {
        let history = this.state.history.slice();
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i] != null) {
            return;
        }
        if(this.state.current !== history.length-1) {
            return;
        }

        squares[i] = current.xIsNext ? 'X' : 'O';
        history.push({
            squares,
            xIsNext: !current.xIsNext,
        });
        this.setState({
            history,
            current: this.state.current+1
        });
    }

    jumpTo(move) {
        let history = this.state.history.slice();
        this.setState({
            history,
            current: move
        });
    }

    render() {
        const current = this.state.history[this.state.current];
        const winner = calculateWinner(current.squares);
        let status; 
        if(winner) {
            status = 'Winner: ' + winner;
        }
        else {
            status = 'Next player: ' + (current.xIsNext ? 'X' : 'O');
        }

        let moves = this.state.history.map((step, move) => {
            const desc = move === 0 ? 'Game Start': 'Move #'+move;
            return (
                <li key={move}>
                <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });

        return (
            <div className="game">
            <div className="game-board">
            <Board squares={current.squares} onClick={i => this.handleClick(i)}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}

// ========================================


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


export default Game;
