const StopIcon = ({w,h}) => {
    const viewBoxSize = Math.max(w, h) * 1.25;
    return (
        <svg
            width={w}
            height={h}
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-${w} h-${h}`}
            preserveAspectRatio="xMidYMid meet"
        >
            <circle cx={viewBoxSize / 2} cy={viewBoxSize / 2} r={viewBoxSize / 2} fill="#fcedeb"></circle>
            <rect x={viewBoxSize * 0.3} y={viewBoxSize * 0.3} width={viewBoxSize * 0.4} height={viewBoxSize * 0.4} rx="5" fill="#e50039"></rect>
        </svg>
    )
}

export default StopIcon