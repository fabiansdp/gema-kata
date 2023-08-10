import {useState} from "react";

const Opening = ({setName}) =>{
    const [tmpName, tmpSetName] = useState("")

    return (
        <div className="h-3/4 justify-center items-center text-center">
            <h3 className="font-bold text-2xl">Berbicara Dengan <br/> Siapa?</h3>
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={tmpName}
                    onChange={(e)=>{tmpSetName(e.target.value)}}
                    className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-primary my-4"
                />
            </div>
            <div className="flex justify-center items-center">
                <button
                    className="bg-blue-400 text-white  py-12 px-8 rounded-full shadow-lg font-semibold text-xl hover:bg-secondary transition duration-300"
                    onClick={()=>{
                        if(tmpName.length < 3){
                            alert("please insert name, length >= 3!s")
                        }else{
                            setName(tmpName)
                        }
                    }}
                >MULAI</button>
            </div>
        </div>
    )
}

export default Opening