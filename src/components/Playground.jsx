import { useEffect, useRef, useState } from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function Playground() {
    const [svgs, setSvgs] = useState([]);
    const [currentSvg, setCurrentSvg] = useState(null);
    const [svgType, setSvgType] = useState("line");

    const gravityToggle = useRef(false);

    // useEffect(() => {

    //     return () => {
    //         gravityToggle.current = false;
    //     };
    // }, []);

    function handleMouseDown(e) {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x1 = e.clientX - bounds.left;
        const y1 = e.clientY - bounds.top;
        const type = svgType;

        setCurrentSvg({type, width: 0, height: 0, x: x1, y: y1, x1, y1, x2: x1, y2: y1, velocity: 1, goingDown: true});
    }

    function handleMouseMove(e) {
        if (!currentSvg) return;

        const bounds = e.currentTarget.getBoundingClientRect();
        const x2 = e.clientX - bounds.left;
        const y2 = e.clientY - bounds.top;
        const x = Math.min(x2, currentSvg.x1);
        const y = Math.min(y2, currentSvg.y1);
        const r = Math.round((Math.sqrt(Math.pow(x2 - currentSvg.x1, 2) + Math.pow(y2 - currentSvg.y1, 2)))/2);
        const cx = (x2 + currentSvg.x1)/2;
        const cy = (y2 + currentSvg.y1)/2;
        const width = Math.abs(x2 - currentSvg.x1);
        const height = Math.abs(y2 - currentSvg.y1);
        setCurrentSvg((cl) => ({...cl, width, height, x, y, x2, y2, r, cx, cy}));
    }


    function handleMouseUp(e) {
        if (!currentSvg) return;

        setSvgs([...svgs, currentSvg]);
        console.log(svgs);
        setCurrentSvg(null);
    }

    function handleGravity(){
        gravityToggle.current = !gravityToggle.current;
        if (gravityToggle.current){
            requestAnimationFrame(gravityAnimation);
        }
    }

    function gravityAnimation() {
        if (!gravityToggle.current) return;
    
        setSvgs(prevSvgs => {
            const newSvgs = prevSvgs.map((svg) => {
                let velocity = svg.velocity;
                const gravity = 0.5;
                const damping = 0.7;
    
                switch (svg.type) {
                    case 'line':
                        if (svg.y1 + 10 > 600) return svg;
                        return { ...svg, y1: svg.y1 + 10, y2: svg.y2 + 10 };
    
                    case 'rect':
                        if (svg.y + svg.height >= 600) {
                            velocity = -Math.abs(velocity) * damping;
                            svg.y = 600 - svg.height;
                        }else {
                            velocity += gravity;
                        }
                        return { ...svg, y: svg.y + velocity, velocity };
    
                    case 'circle':
                        if (svg.cy + svg.r >= 600) {
                            velocity = -Math.abs(velocity) * damping;
                            svg.cy = 600 - svg.r;
                        }else {
                            velocity += gravity;
                        }
    
                        return { ...svg, cy: svg.cy + velocity, velocity };
    
                    default:
                        return svg;
                }
            });
            return newSvgs;
        });
    
        requestAnimationFrame(gravityAnimation);
    }

    return (
        <div className="center flex-col h-auto w-full bg-gray-300">
            <div className="flex justify-between items-start w-full">
                <div>
                    <h1 className="text-3xl">Playground</h1>
                    <p>Let's draw some geometric figures!</p>
                </div>
            </div>
            <div className="flex gap-10 bg-green-300 w-full p-5">
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
                    {svgs.map((svg, index) => (
                        <svg.type
                            key={index}
                            height= {svg.height}
                            width= {svg.width}
                            x={svg.x}
                            y={svg.y}
                            x1={svg.x1}
                            y1={svg.y1}
                            x2={svg.x2}
                            y2={svg.y2}
                            r={svg.r}
                            cx={svg.cx}
                            cy={svg.cy}
                            stroke="red"
                            strokeWidth="2"
                        />
                    ))}
                    {currentSvg && (
                        <currentSvg.type
                            width={currentSvg.width}
                            height={currentSvg.height}
                            x={currentSvg.x}
                            y={currentSvg.y}
                            x1={currentSvg.x1}
                            y1={currentSvg.y1}
                            x2={currentSvg.x2}
                            y2={currentSvg.y2}
                            r={currentSvg.r}
                            cx={currentSvg.cx}
                            cy={currentSvg.cy}
                            stroke="red"
                            strokeWidth="5"
                        />
                    )}
                </svg>
                <div className="center rounded-md flex-col gap-2 bg-white w-1/5">
                <h1 className="select-none">Current tool: {svgType}</h1>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <h2 className="bg-green-400 rounded-md p-2 w-full hover:bg-green-300">Tools</h2>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className="bg-gray-200 flex justify-start align-middle flex-col h-auto">
                            <DropdownMenu.Label><h4>Label</h4></DropdownMenu.Label>
                            <DropdownMenu.Item><h2>Item 1</h2></DropdownMenu.Item>
                            <DropdownMenu.Item><h2>Item 2</h2></DropdownMenu.Item>
                            <DropdownMenu.Item><h2>Item 3</h2></DropdownMenu.Item>

                            <DropdownMenu.Separator>
                                <h2>Separator</h2>
                            </DropdownMenu.Separator>

                            <DropdownMenu.Group>
                                <DropdownMenu.Item><h2>Group Item 1</h2></DropdownMenu.Item>
                                <DropdownMenu.Item><h2>Group Item 2</h2></DropdownMenu.Item>
                                <DropdownMenu.Item><h2>Group Item 3</h2></DropdownMenu.Item>
                            </DropdownMenu.Group>

                            <DropdownMenu.CheckboxItem>
                                <DropdownMenu.ItemIndicator>
                                    <span>✔ Checked</span>
                                </DropdownMenu.ItemIndicator>
                                <h2>Checkbox Item</h2>
                            </DropdownMenu.CheckboxItem>

                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger><h2>Sub Trigger</h2></DropdownMenu.SubTrigger>
                                <DropdownMenu.Portal>
                                    <DropdownMenu.SubContent className="flex justify-start align-middle flex-col h-auto">
                                        <DropdownMenu.Item><h2>Sub Item 1</h2></DropdownMenu.Item>
                                        <DropdownMenu.Item><h2>Sub Item 2</h2></DropdownMenu.Item>
                                    </DropdownMenu.SubContent>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Sub>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                    </DropdownMenu.Root>
                    <div className="center flex-col gap-2 m-2 p-2 w-full">
                        <button className="bg-green-400 rounded-md p-2 w-full hover:bg-green-300" onClick={() => setSvgType('line')}>Line</button>
                        <button className="bg-green-400 rounded-md p-2 w-full hover:bg-green-300" onClick={() => setSvgType('rect')}>Rect</button>
                        <button className="bg-green-400 rounded-md p-2 w-full hover:bg-green-300" onClick={() => setSvgType('circle')}>Circle</button>
                    </div>
                    <div className="center flex-col gap-2 m-2 p-2 w-full">
                        <button className="bg-green-400 rounded-md p-2 w-full hover:bg-green-200" onClick={() => setSvgs([])}>Clear</button>
                        <button className="bg-green-400 rounded-md p-2 w-full hover:bg-green-200" onClick={handleGravity}>Gravity</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playground;
