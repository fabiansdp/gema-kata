const MicIcon = ({ w, h }) => {
    return (
        <svg
            width={w}
            height={h}
            viewBox={`0 0 250 250`}  // Fixed viewBox size to maintain aspect ratio
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-${w} h-${h}`}
            preserveAspectRatio="none"
        >
            <circle cx="125" cy="125" r="120" fill="#F2F8FF"></circle>
            <circle cx="124.375" cy="124.375" r="78.125" fill="#006BE5"></circle>
            <path
                d="M149.083 117.833V125C149.083 138.853 137.853 150.083 124 150.083M124 150.083C110.147 150.083 98.9167 138.853 98.9167 125V117.833M124 150.083V160.833M109.667 160.833H138.333M124 135.75C118.063 135.75 113.25 130.937 113.25 125 V99.9167C113.25 93.9797 118.063 89.1667 124 89.1667C129.937 89.1667 134.75 93.9797 134.75 99.9167V125C134.75 130.937 129.937 135.75 124 135.75Z"
                stroke="white"
                strokeWidth="5"  // Use "strokeWidth" instead of "stroke-width"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></path>
        </svg>
    );
};
export default MicIcon