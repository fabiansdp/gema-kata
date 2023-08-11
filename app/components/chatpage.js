import { prosaSTT, generateAnswers } from "@/app/ai";
import {useEffect, useRef, useState} from "react";
import CircularLoader from "@/app/components/circular_loading";
import ResultCard from "@/app/components/chatComponent/resultCard";
import SourceCard from "@/app/components/chatComponent/sourceCard";
import MicIcon from "@/app/components/button/mic";
import StopIcon from "@/app/components/button/stop";


const ChatPage = ({userName}) => {
    const mediaRecorder = useRef(null);
    const [isQuestionRecording, setIsQuestionRecording] = useState(false)
    const [isUserRecording, setIsUserRecording] = useState(false)
    const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [predictionResult, setPredictionResult] = useState([])
    const [question, setQuestion] = useState(null)
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        getMicrophonePermission()
    },[permission])

    const blobToBase64 = (blob) => {
        return new Promise((resolve, _) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    const startRecording = async (role) => {
        if (role === "question") {
            setIsQuestionRecording(true)
        } else {
            setIsUserRecording(true)
        }

        const media = new MediaRecorder(stream, {mimeType:"audio/webm"})
        mediaRecorder.current = media
        mediaRecorder.current.start()

        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    }

    const generateResult = async (test, role) => {
        const transcription = await prosaSTT(test)

        if (transcription.result.data.length > 0) {
            const text = transcription.result.data[0].transcript
            if (role === "question") {
                setMessages(prevState => [...prevState, {
                    "role": role,
                    "message": text
                }])
                setQuestion(text)
            } else {
                const completion = await generateAnswers(
                    question,
                    text
                )
        
                setPredictionResult(completion)
            }
        } else {
            alert("cannot detect sound")
        }
    }

    const stopRecording = async(role) => {
        if (role === "question") {
            setIsQuestionRecording(false)
        } else {
            setIsUserRecording(false)
        }

        //stops the recording instance
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { mimeType:"audio/webm"});
            blobToBase64(audioBlob).then(res => {
                const base64 = res.split(',')[1];
                setAudioChunks([])

                setIsLoading(true)
                generateResult(base64, role)
                .finally(()=>{
                    setIsLoading(false)
                })
            })
          
        };

        mediaRecorder.current.stop();
    }

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
                return streamData

            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const selectAnswer = (text) => {
        setMessages([...messages, {
            "role": "user",
            "message": text
        }])
        setPredictionResult([])
    }

    return (
        <div className="min-h-screen">
            <div className="flex justify-center items-center my-3 mx-auto">
                <ChatNavBar userName={userName}/>
            </div>

            <div className="h-3/5 flex flex-col items-center mx-auto">
                <div className="flex flex-col flex-grow-0 flex-shrink-0 w-[327px] gap-[35px]" >
                    {messages.map((item, idx) => {
                        if (item.role === "question") {
                            return <SourceCard text={item.message} key={idx}/>
                        } else {
                            return <ResultCard onClick={(text) => {}} text={item.message} key={idx}/>
                        }
                    }
                    )}
                </div>
                {predictionResult.length > 0 ?
                    <div className="flex flex-col justify-start items-end flex-grow-0 flex-shrink-0 gap-4">
                        <div
                            className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative gap-[15px]"
                        >
                            <p className="flex-grow-0 flex-shrink-0 text-sm mt-6 font-bold text-right text-[#090a0a]">
                                Pilih tanggapanmu
                            </p>
                            {
                                predictionResult.map((item, idx) =>
                                    <ResultCard clickable={true} onClick={selectAnswer} text={item} key={idx}/>
                                )
                            }
                        </div>
                    </div>
                :
                    <></>
                }
            </div>
            <div className="flex">
                {isLoading ?
                    <div className="h-3/5 flex justify-center items-center mx-auto">
                        <CircularLoader/>
                    </div>
                    : <></>
                }
            </div>

            <div className={"h-1/5 flex justify-center items-center mx-auto"}>
                <div>
                    <p>Question</p>
                    {
                        !isQuestionRecording ? 
                        (
                            <div className="flex flex-col justify-center">
                                <button onClick={() => startRecording("question")}>
                                    <MicIcon h={150} w={150}/>
                                </button>
                            </div>
                        ):(
                            <button onClick={() => stopRecording("question")}>
                                <StopIcon h={150} w={150}/>
                            </button>
                        )
                    }
                </div>
                <div>
                    <p>Answer</p>
                    {
                        !isUserRecording ? 
                        (
                            <div className="flex flex-col justify-center">
                                <button onClick={() => startRecording("user")}>
                                    <MicIcon h={150} w={150}/>
                                </button>
                            </div>
                        ):(
                            <button onClick={() => stopRecording("user")}>
                                <StopIcon h={150} w={150}/>
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ChatPage

const ChatNavBar = ({userName}) =>{
    return (
        <div className="flex justify-start items-start w-[327px]">
            <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-6">
                <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0 w-11 h-11 relative"
                    preserveAspectRatio="none"
                >
                    <rect width="44" height="44" fill="white"></rect>
                    <circle cx="22" cy="22" r="21.5" fill="white" stroke="#E3E5E6"></circle>
                    <path
                        d="M30 22.75C30.4142 22.75 30.75 22.4142 30.75 22C30.75 21.5858 30.4142 21.25 30 21.25V22.75ZM14 21.25C13.5858 21.25 13.25 21.5858 13.25 22C13.25 22.4142 13.5858 22.75 14 22.75V21.25ZM17.472 27.5327C17.7662 27.8243 18.2411 27.8222 18.5327 27.528C18.8243 27.2338 18.8222 26.7589 18.528 26.4673L17.472 27.5327ZM16.237 25.2527L16.765 24.72H16.765L16.237 25.2527ZM16.237 18.7473L15.7091 18.2146H15.7091L16.237 18.7473ZM18.528 17.5327C18.8222 17.2411 18.8243 16.7662 18.5327 16.472C18.2411 16.1778 17.7662 16.1757 17.472 16.4673L18.528 17.5327ZM14.0199 22.3133L13.2759 22.4082L13.2759 22.4082L14.0199 22.3133ZM14.0199 21.6867L13.2759 21.5918L13.2759 21.5918L14.0199 21.6867ZM30 21.25H14V22.75H30V21.25ZM18.528 26.4673L16.765 24.72L15.7091 25.7854L17.472 27.5327L18.528 26.4673ZM16.765 19.28L18.528 17.5327L17.472 16.4673L15.7091 18.2146L16.765 19.28ZM16.765 24.72C16.0495 24.0109 15.5587 23.5228 15.2266 23.1093C14.904 22.7076 14.7933 22.4496 14.7639 22.2185L13.2759 22.4082C13.3547 23.0263 13.6496 23.5412 14.0571 24.0485C14.455 24.544 15.0186 25.1011 15.7091 25.7854L16.765 24.72ZM15.7091 18.2146C15.0186 18.8989 14.455 19.456 14.0571 19.9515C13.6496 20.4588 13.3547 20.9737 13.2759 21.5918L14.7639 21.7815C14.7933 21.5504 14.904 21.2924 15.2266 20.8907C15.5587 20.4772 16.0495 19.9891 16.765 19.28L15.7091 18.2146ZM14.7639 22.2185C14.7454 22.0734 14.7454 21.9266 14.7639 21.7815L13.2759 21.5918C13.2414 21.8629 13.2414 22.1371 13.2759 22.4082L14.7639 22.2185Z"
                        fill="#72777A"
                    ></path>
                </svg>
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
                    <svg
                        width="44"
                        height="44"
                        viewBox="0 0 44 44"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0 w-11 h-11 relative"
                        preserveAspectRatio="none"
                    >
                        <circle cx="22" cy="22" r="22" fill="#F2F8FF"></circle>
                        <g clip-path="url(#clip0_348_1354)">
                            <path
                                d="M22 20C23.933 20 25.5 18.433 25.5 16.5C25.5 14.567 23.933 13 22 13C20.067 13 18.5 14.567 18.5 16.5C18.5 18.433 20.067 20 22 20Z"
                                fill="#0070F0"
                                stroke="#0070F0"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                            <path
                                d="M13 30.4V31H31V30.4C31 28.1598 31 27.0397 30.5641 26.184C30.1806 25.4314 29.5686 24.8195 28.816 24.436C27.9603 24 26.8402 24 24.6 24H19.4C17.1598 24 16.0397 24 15.1841 24.436C14.4314 24.8195 13.8195 25.4314 13.436 26.184C13 27.0397 13 28.1598 13 30.4Z"
                                fill="#0070F0"
                                stroke="#0070F0"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_348_1354">
                                <rect width="24" height="24" fill="white" transform="translate(10 10)"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                    <div
                        class="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-0.5"
                    >
                        <p class="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-[#202325]">
                            {userName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}