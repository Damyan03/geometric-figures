import { useEffect, useRef, useState } from "react";

function Playground() {
    const [svgs, setSvgs] = useState([]);
    const [currentLine, setCurrentLine] = useState(null);

    function handleMouseDown(e) {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x1 = e.clientX - bounds.left;
        const y1 = e.clientY - bounds.top;
        
        setCurrentLine({ x1, y1, x2: x1, y2: y1 });
    }

    function handleMouseMove(e) {
        if (!currentLine) return;

        const bounds = e.currentTarget.getBoundingClientRect();
        const x2 = e.clientX - bounds.left;
        const y2 = e.clientY - bounds.top;
        
        setCurrentLine((cl) => ({...cl, x2, y2}));
    }

    function handleMouseUp(e) {
        if (!currentLine) return;

        setSvgs([...svgs, currentLine]);
        setCurrentLine(null);
    }

    return (
        <div className="center flex-col h-auto w-full bg-gray-300">
            <div className="flex justify-between items-start w-full">
                <div>
                    <h1 className="text-3xl">Playground</h1>
                    <p>Let's draw some geometric figures!</p>
                </div>
                <h1>test</h1>
            </div>
            <div className="bg-green-300 w-full p-5">
                <svg
                    id="pgcanvas"
                    height="600"
                    width="600"
                    className="bg-white select-none"
                    xmlns="http://www.w3.org/2000/svg"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {svgs.map((line, index) => (
                        <line
                            key={index}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="red"
                            strokeWidth="2"
                        />
                    ))}
                    {currentLine && (
                        <line
                            x1={currentLine.x1}
                            y1={currentLine.y1}
                            x2={currentLine.x2}
                            y2={currentLine.y2}
                            stroke="red"
                            strokeWidth="2"
                        />
                    )}
                </svg>
            </div>
        </div>
    );
}

export default Playground;
