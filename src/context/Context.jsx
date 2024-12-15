import { FunctionCallingMode } from "@google/generative-ai";
import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord)
        }, 75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        setResultData('')
        setLoading(true)
        setShowResult(true)
        let response
        if(prompt !== undefined) { // user jab purana data check krega tab ye chalega
            response = await run(prompt)
            setRecentPrompt(prompt)
        } else { // user jab kuch search krega tab ye chalega
            setPreviousPrompt(prev => [...prev, input])
            setRecentPrompt(input)
            response = await run(input)
        }
        

        let responseArray = response.split('**') // used to remove * form the data send from gemini
        let newResponse = ''
        for(let i = 0; i < responseArray.length; i++) {
            if(i === 0 || i % 2 !== 1) { // checking for even index or 0
                newResponse += responseArray[i]
            } else {
                newResponse += '<b>' + responseArray[i] + '</b>' // jaha pe bhi '**' milega wo text bold ho jayega
                // newResponse += responseArray[i]
            }
        }

        let newResponse2 = newResponse.split('*').join('</br>')

        // setResultData(newResponse2)
        let newResponseArray = newResponse2.split(" ") // space pe split hoga mtlb humare text me koi bhi space nhi hoga. Eske liye alag se space add krna padega.
        for(let i=0; i<newResponseArray.length; i++) {
            const nextWord = newResponseArray[i]
            delayPara(i, nextWord + " ")
        }

        setLoading(false)
        setInput('')
    }

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider 