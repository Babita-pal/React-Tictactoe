import React, { useState } from 'react';

function Board() {
    const winnerArr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const [inputs, setInputs] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState(true);

    const winner = calculateWinner();
    let status = "";
    if (winner) {
        status = "Winner is " + (!player ? "X" : "O");
    } else {
        status = "Next Player is " + (player ? "X" : "O");
    }

    function calculateWinner() {
        for (let i = 0; i < winnerArr.length; i++) {
            const [x, y, z] = winnerArr[i];

            if (inputs[x] && inputs[x] === inputs[y] && inputs[x] === inputs[z]) {
                return inputs[x];
            }
        }
        return null;
    }

    const handleInput = (event) => {
        if (!event.target.className.includes('input-box')) return;
        const index = event.target.dataset.index;
        if (inputs[index] !== null) return;

        const copiedArray = inputs.map((input, idx) => {
            if (idx === parseInt(index)) {
                return player ? "X" : "O";
            }
            return input;
        });

        setInputs(copiedArray);
        setPlayer(!player);
    }

    return (
        <section className="grid grid-cols-3 gap-2 p-4 max-w-sm mx-auto bg-pink-200 shadow-lg border-8 rounded-lg mt-8">
            {inputs.map((input, index) => {
                return (
                    <div 
                        key={index} 
                        data-index={index} 
                        onClick={handleInput}
                        className="input-box flex items-center justify-center w-24 h-24 border border-purple-400 rounded-md border-8 cursor-pointer hover:bg-blue-100 text-xl font-bold text-pink-500"
                    >
                        {input}
                    </div>
                );
            })}
            <p className="col-span-3 mt-4 text-lg font-semibold text-center text-pink-500">{status}</p>
        </section>
    );
}

export default Board;
