import axios from "axios";

const ProsaAPIKEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ik5XSTBNemRsTXprdE5tSmtNaTAwTTJZMkxXSTNaamN0T1dVMU5URmxObVF4Wm1KaSIsInR5cCI6IkpXVCJ9.eyJhcHBsaWNhdGlvbl9pZCI6MjIxODEyLCJsaWNlbnNlX2tleSI6IjJhZjkwYzBjLTFkMWUtNDJhZi1hMzEyLTQwMDkzYWM2YTRkYiIsInVuaXF1ZV9rZXkiOiIxMjY3MDk5My1iNDg4LTQzY2UtOWM4YS02Y2U1YTJmNTM1NjQiLCJwcm9kdWN0X2lkIjozLCJhdWQiOiJhcGktc2VydmljZSIsInN1YiI6ImRlMmRlOTVjLTQ2NjYtNGE3ZS1iZGJlLWQ5N2Q3YTQwMGMyYiIsImlzcyI6ImNvbnNvbGUiLCJpYXQiOjE2OTA4MTUxMjR9.mvbAZwgQRVQsL9csYPJI1Wce7evDPXOjn66kjFrfc17R-iMwwcmeQQJhcfuHzt211FPSE0oHubCZBOJSK2NmutqiKFW67mCygmJBRitOjW_p-DuoI0NuRcEngp5GtiHJQ9-aHZw8K4fl1DnTRxtlHcTVlDug96_wXUj8BNtWTFxA1gYiNTkRgmBne3w7hphnmnizmEwshtZFqLow2gIQJzYFJQO7oskAyVujaUuLdlVwqK3yjp1AyCVDHUMCihhwaXpIC7ewnC76YULCjvWh_TL_PCRqeNK1ZCx4qKz_ff0-W-zzMuDaNfRcYiJbw9vgxijlrsK0Of_RV8-cpVFcbg"
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
            "x-api-key": ProsaAPIKEY
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

    const result = await axios.post("https://api.prosa.ai/v2/speech/stt",
        payload, {
            headers: {
                "x-api-key": ProsaAPIKEY
            }
        }).then(r=>{
        if (r.result) {
            return r.result.data
        }else{
            console.log("DEBUGGING ON prosaSTT RESPONSE: ", r)
            return null
        }
    }).catch(e=>{
        console.error("axios prosa TTS Error: ", e)
        return null
    })
    return result
}