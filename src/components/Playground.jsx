import { useEffect, useRef, useState } from "react";
import { createElement } from "react"


function Playground() {

    const [svgs, setSvgs] = useState([])
    const [svg, setSvg] = useState(null)

    function handleAddSvg(e){
        console.log('drawing line')
        const bounds = e.target.getBoundingClientRect();
        let x1 = e.clientX - bounds.left;
        let y1 = e.clientY - bounds.top;
        console.log(x1, y1)
        const newSvg = createElement('line', {height: 300, width: 300, x1: `${x1}`, y1: `${y1}`, x2: '300', y2: '300', stroke: 'red', strokeWidth: 2});
        setSvgs([...svgs, newSvg])
    }
    
    function drawOngoingSvg(e){
        console.log('ongoing')
        if (isDrawing){
            x2.current = e.clientX - bounds.left;
            y2.current = e.clientY - bounds.top;
        }
    }
    

    return (
        <div className="center flex-col h-auto w-full bg-gray-300">
            <div className='flex justify-between items-start w-full'>
                <div>
                    <h1 className="text-3xl">Playground</h1>
                    <p>Let's draw some geometric figures!</p>
                </div>
                <h1>test</h1>
            </div>
            <div className="bg-green-300 w-full p-5">
                <svg id="pgcanvas" height="600" width="600" className="bg-white select-none" onMouseDown={handleAddSvg} xmlns="http://www.w3.org/2000/svg">
                    {svgs.map((svg, index) =>
                        <svg.type key={index} style={svg.props} 
                        x1={svg.props.x1}
                        y1={svg.props.y1}
                        x2={svg.props.x2}
                        y2={svg.props.y2} />
                    )}
                </svg>
            </div>
        </div>
    )
}

export default Playground