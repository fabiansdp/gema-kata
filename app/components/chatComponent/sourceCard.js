import { AudioPlayer } from "./audioPlayer";

const SourceCard = ({text}) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    const locale = 'id-ID'; // Bahasa Indonesia

    const formattedDate = new Intl.DateTimeFormat(locale, options).format(new Date());

    return (
        <div
            className="flex flex-col justify-start items-end self-stretch flex-grow-0 flex-shrink-0 relative gap-4"
        >
            <p
                className="self-stretch flex-grow-0 flex-shrink-0 w-[327px] text-xs font-medium text-center text-[#72777a]"
            >
                {formattedDate}
            </p>
            <div
                className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-2"
            >
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0 w-8 h-8 relative"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <circle cx="16" cy="16" r="16" fill="#F2F8FF"></circle>
                    <path
                        d="M16.0002 13.8333C17.1277 13.8333 18.0418 12.9193 18.0418 11.7917C18.0418 10.6641 17.1277 9.75 16.0002 9.75C14.8726 9.75 13.9585 10.6641 13.9585 11.7917C13.9585 12.9193 14.8726 13.8333 16.0002 13.8333Z"
                        fill="#0070F0"
                        stroke="#0070F0"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                    <path
                        d="M10.75 19.9001V20.2501H21.25V19.9001C21.25 18.5933 21.25 17.9399 20.9957 17.4408C20.772 17.0017 20.415 16.6448 19.976 16.4211C19.4768 16.1667 18.8235 16.1667 17.5167 16.1667H14.4833C13.1765 16.1667 12.5232 16.1667 12.024 16.4211C11.585 16.6448 11.228 17.0017 11.0043 17.4408C10.75 17.9399 10.75 18.5933 10.75 19.9001Z"
                        fill="#0070F0"
                        stroke="#0070F0"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
                <div className="flex justify-start items-start flex-grow">
                    <div
                        className="flex justify-start items-start flex-grow relative gap-2.5 p-4 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl bg-[#f2f4f5]"
                    >
                        <p className="flex-grow w-[203px] text-lg text-left text-[#303437]">
                            {text}
                        </p>
                    </div>
                    <AudioPlayer text={text} />
                </div>
            </div>
        </div>
    )
}

export default SourceCard