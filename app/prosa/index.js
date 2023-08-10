import axios from "axios";

const prosaApiKey = process.env.NEXT_PUBLIC_PROSA_API_KEY

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
                    "x-api-key": prosaApiKey
                }
            })
        return result.data
    } catch (err) {
        console.log(err)
    }

    return null
}