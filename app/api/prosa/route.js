import axios from "axios";

const prosaTTS = async ({text}) => {
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
    const result = await axios.post("https://api.prosa.ai/v2/speech/tts",
        payload, {
        headers: {
            "x-api-key": prosaApiKey
        }
    }).then(r=>{
        return r.data
    }).catch(e=>{
        console.error("axios prosa TTS Error: ", e)
        return null
    })
    return result
}

const prosaSTT = async ({b64Audio, label}) => {
    const payload = {
        "config": {
            "engine": "stt-general",
            "wait": true,
            "include_filler": false,
            "include_partial_results": false
        },
        "request": {
            "label": label,
            "data": b64Audio
        }
    }

    const result = await axios.post(
        "https://api.prosa.ai/v2/speech/stt",
        payload, 
        {
            headers: {
                "x-api-key": prosaApiKey
            }
        })
    .then(r => {
        if (r.result) {
            console.log(r.result)
            return r.result.data
        } else{
            console.log("DEBUGGING ON prosaSTT RESPONSE: ", r)
            return null
        }
    })
    .catch(e => {
        console.error("axios prosa TTS Error: ", e)
        return null
    })
    return result
}