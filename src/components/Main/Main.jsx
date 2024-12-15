import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
    const {onSent, recentPrompt, showResult, loading, resultData, input, setInput} = useContext(Context)

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>

                <img src={assets.user_icon} alt="" />
            </div>

            <div className="main-container">
                {!showResult ? 
                    <>
                        <div className="greet">
                            <p><span>Hello, Praveen</span></p>

                            <p>How can I help you today?</p>
                        </div>

                        <div className="cards">
                            <div 
                                onClick={() => {
                                    onSent('Suggest places to visit for a vacation.')
                                }}
                                className="card"
                            >
                                <p>Suggest places to visit for a vacation</p>

                                <img src={assets.compass_icon} alt="" />
                            </div>

                            <div 
                                onClick={() => {
                                    onSent('Want to learn 3D modeling.')
                                }}
                                className="card"
                            >
                                <p>Want to learn 3D modeling</p>

                                <img src={assets.bulb_icon} alt="" />
                            </div>

                            <div
                                onClick={() => {
                                    onSent('Learn more about react.')
                                }}
                                className="card"
                            >
                                <p>Learn more about react</p>

                                <img src={assets.code_icon} alt="" />
                            </div>

                            <div
                                onClick={() => {
                                    onSent('Search for new upcoming technologies.')
                                }}
                                className="card"
                            >
                                <p>Search for new upcoming technologies</p>

                                <img src={assets.message_icon} alt="" />
                            </div>
                        </div>
                    </>
                : <>
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />

                            <p>{recentPrompt}</p>
                        </div>

                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />

                            {loading ? // shimmer ui: loading animation
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            : 
                                // <p>{resultData}</p>
                                <p dangerouslySetInnerHTML={{__html: resultData}}></p> // with this string k ander ho html wale tags hai wo show nhi honge
                            }
                        </div>
                    </div>
                </>
                }

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Ask Gemini'
                        />

                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            
                            <img src={assets.mic_icon} alt="" />
                            
                            {input ? <img
                                className='send-btn'
                                onClick={() => onSent()}
                                src={assets.send_icon}
                                alt=""
                            /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main