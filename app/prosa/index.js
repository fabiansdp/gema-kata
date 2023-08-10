import axios from "axios";

const sttApiKey = process.env.NEXT_PUBLIC_STT_API_KEY
const ttsApiKey = process.env.NEXT_PUBLIC_TTS_API_KEY

export const prosaSTT = async (b64Audio) => {
    const payload = {
        "config": {
            "engine": "stt-general",
            "wait": true,
            "include_filler": false,
            "include_partial_results": false
        },
        "request": {
            "data": b64Audio
        }
    }

    try {
        const result = await axios.post(
            "https://api.prosa.ai/v2/speech/stt",
            payload, 
            {
                headers: {
                    "x-api-key": sttApiKey
                }
            })
        return result.data
    } catch (err) {
        console.log(err)
    }

    return null
}

export const prosaTTS = async ({text}) => {
    const payload = {
        "config": {
            "model": "tts-dimas-expressive",
            "wait": true,
            "audio_format": "opus"
        },
        "request": {
            "text": text
        }
    }

    try {
        const result = await axios.post("https://api.prosa.ai/v2/speech/tts",
            payload, {
            headers: {
                "x-api-key": ttsApiKey
            }
        })
        return result
    } catch (err) {
        console.log(err)
    }

    return null
}