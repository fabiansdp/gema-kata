const ResultCard = ( {text} ) => {
    return (
        <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[327px] gap-2">
            <div
                className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2.5"
            >
                <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0 w-[52px] h-[51px] relative"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M45.5 26C45.5 36.5625 36.7696 45.125 26 45.125C15.2305 45.125 6.5 36.5625 6.5 26C6.5 15.4376 15.2305 6.875 26 6.875C36.7696 6.875 45.5 15.4376 45.5 26Z"
                        stroke="#0070F0"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M32.5031 24.5856C33.2265 25.0584 33.5882 25.2949 33.7143 25.5931C33.8243 25.8536 33.8243 26.1464 33.7143 26.4069C33.5882 26.7051 33.2265 26.9416 32.5031 27.4144L24.3614 32.7379C23.4859 33.3104 23.0482 33.5967 22.6853 33.5754C22.3692 33.5567 22.0769 33.4035 21.8858 33.1557C21.6665 32.8714 21.6665 32.3554 21.6665 31.3235V20.6765C21.6665 19.6446 21.6665 19.1287 21.8858 18.8443C22.0769 18.5965 22.3692 18.4432 22.6853 18.4247C23.0482 18.4034 23.4859 18.6896 24.3614 19.262L32.5031 24.5856Z"
                        fill="#0070F0"
                        stroke="#0070F0"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </div>
            <div
                className="flex justify-start items-start flex-grow relative gap-2.5 p-4 rounded-3xl bg-[#f2f8ff]"
            >
                <p className="flex-grow w-[235px] text-xl font-medium text-right text-[#006be5]">
                    {text}
                </p>
            </div>
        </div>
    )
}

export default ResultCard