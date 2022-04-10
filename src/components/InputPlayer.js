import React from "react"
import {Table} from "react-bootstrap"
import {useEffect, useState} from 'react'
import data from "../data/players"

export default function Main(){

    const [player, setPlayer] = useState([])
    const [guess, setGuess] = useState({})
    const [guesses, setGuesses] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [answer, setAnswer] = useState({})
    const [count, setCount] = useState(1)
    const styles = {
        popup:{
          background: answer.Name === guesses.Name ? "green" : "red"
        }
      };

    useEffect(() => {
        const loadPlayers = () => {
            const resp = data;
            
            let i = Math.floor(Math.random() * (data.players.length - 1)) + 0;
        
            setAnswer(data.players[i])
            setPlayer(resp.players)
            
            
        }

        loadPlayers()
    }, [])


    

    const onSuggestHandler = (text) => {
        setText(text);
        setSuggestions([]);
    }

    const onGuessHandler = (text) => {
        let matches = []
        if(text.length > 0){
            matches = player.filter(player=>{
                return player.Name.match(text)
            })
        }
        setGuess(matches[0])
        setCount(count => count + 1)
        setGuesses([...guesses , matches[0]])
        setText('')
    }

    const onGetAnswer = () => {
        let i = Math.floor(Math.random() * (player.length - 1)) + 0;
        
        setAnswer(player[i])
       
    }


    const onChangeHandler = (text) => {
        
        let matches = []
        if(text.length > 0){
            matches = player.filter(player=>{
                const regex = new RegExp(`${text}`, "gi")
                return player.Name.match(regex) && !guesses.includes(player)
            })
        }
        console.log(answer)
        setSuggestions(matches)
        setText(text)
    }
    return (
        <div className="mb-3 container testes">
            <input 
                className="inputPlayer col-md-12 input" 
                placeholder={"Guess " + count + " of 8" } 
                onChange={e => onChangeHandler(e.target.value)}
                value={text}
                autoComplete="off"
                onBlur={() => 
                setTimeout(() => {
                    setSuggestions([])
                }, 100)}
                />
                {suggestions && suggestions.map((suggestions, i ) =>
                <div key={i}
                    onClick={() => onGuessHandler(suggestions.Name)}
                    className="col-md-12 justify-content-md-center suggestionBox">{suggestions.Name}</div>
            )}

            <div className="mt-5">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Zona</th>
                            <th>Team</th>
                            <th>Position</th>
                            <th>Age</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guesses && guesses.map((guesses, i ) =>
                        <tr key={i}
                            className="col-md-12 justify-content-md-center">
                            <td className="teamColumn" style={{ background: answer.Name === guesses.Name ? "#37be75" : "#edeae5" }}>{guesses.Name}</td>
                            <td className="teamColumn" style={{ background: answer.Zona === guesses.Zona ? "#37be75" : "#edeae5" }}>{guesses.Zona}</td>
                            <td className="teamColumn" style={{ background: answer.Team === guesses.Team ? "#37be75" : "#edeae5" }}><img src={require(`../images/${guesses.Logo}`)} className="logo"></img><p class="teamName">{guess.Team}</p></td>
                            <td className="teamColumn" style={{ background: answer.Position === guesses.Position ? "#37be75" : "#edeae5"  }}>{guesses.Position}</td>
                            <td className="teamColumn" style={{ background: answer.Age === guesses.Age ? "#37be75" : "#edeae5" }}>
                                <div className="bigger">
                                    <p style={{display:"inline"}}>{guesses.Age} </p>
                                    {
                                        (()=> {
                                            
                                            if( answer.Age > guesses.Age) return <i class="arrow-blue-up"></i>;
                                            else if( answer.Age < guesses.Age) return <i class="arrow-blue-down">Down</i>;
                                            else return "";
                                            
                                        })()
                                    }
                                </div>
                            </td>
                            <td className="teamColumn" style={{ background: answer.Number === guesses.Number ? "#37be75" : "#edeae5" }}>
                            <div className="bigger">
                                    <p style={{display:"inline"}}>{guesses.Number} </p>
                                    {
                                        (()=> {
                                            
                                            if( answer.Number > guesses.Number) return <i class="arrow-blue-up"></i>;
                                            else if( answer.Number < guesses.Number) return <i class="arrow-blue-down">Down</i>;
                                            else return "";
                                            
                                        })()
                                    }
                                </div>
                            </td>
                        </tr>
                         )}
                    </tbody>
                </Table>
            </div>
        </div>
    )

    function search(){
        console.log("cenas")
    }
}
