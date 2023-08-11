import { AudioPlayer } from "./audioPlayer"

const ResultCard = ({text, onClick, clickable=false}) => {
    return (
        <div 
            className={`${clickable ? "cursor-pointer" : ""} flex justify-start items-start flex-grow-0 flex-shrink-0 w-[327px] gap-2`}
        >
            <AudioPlayer text={text} />
            <div
                onClick={onClick !== null ? (e) => onClick(text) : () => {}} 
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