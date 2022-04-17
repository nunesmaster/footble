import React from "react"
import {Table} from "react-bootstrap"
import Button from '@mui/material/Button';
import {useEffect, useState, useRef} from 'react'
import axios from 'axios'

export default function Main(){

    const [country, setCountry] = useState([])
    const [guess, setGuess] = useState({})
    const [guesses, setGuesses] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [answer, setAnswer] = useState({})
    const [count, setCount] = useState(1)
    const [iterator, setIterator] = useState(0)



    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {

                let x  = res.data.filter(function (el) {
                    return el.independent
                  });
                setCountry(x)
                let i = Math.floor(Math.random() * (x.length - 1)) + 0;
        
                setAnswer(x[i])
                console.log(x)
            })

    }, [])



    const onSuggestHandler = (text) => {
        setText(text);
        setSuggestions([]);
    }

    const onGameOver = () => {

        document.getElementById('inputBox').placeholder = "Game Over"
        document.getElementById('inputBox').disabled = true
    }

    const onGameWon= () => {
        
        document.getElementById('inputBox').placeholder = "You won!"
        document.getElementById('inputBox').disabled = true
    }

    const onGuessHandler = (text) => {
        document.getElementById('inputBox').focus()
        document.getElementById('inputDiv').style.display = "none"
        let matches = []
        if(text.length > 0){
            matches = country.filter(country => {
                return country.name.common === text
            })
        }
        //console.log(answer.name.common)
        //console.log(matches[0].name)
        if(answer.name.common === matches[0].name.common){
            setGuess(matches[0])
            setGuesses([...guesses , matches[0]])
            onGameWon()
            return;
        }
        if(count === 8){
            setGuess(matches[0])
            let arr = [matches[0], answer]
            setGuesses((guesses) => guesses.concat([ ...arr]))
            onGameOver()
            return;
        }
        setGuess(matches[0])
        setCount(count => count + 1)
        setGuesses([...guesses , matches[0]])
        setText('')
    }

    const onGetAnswer = () => {
        let i = Math.floor(Math.random() * (country.length - 1)) + 0;
        
        setAnswer(country[i])
        console.log(answer)
       
    }


    const onChangeHandler = (text) => {
        document.getElementById('inputDiv').style.display = "block"
        let matches = []
        if(text.length > 0){
            matches = country.filter(country=>{
                const regex = new RegExp(`${text}`, "gi")
                return country.name.common.match(regex) && !guesses.includes(country)
            })
        }
        setSuggestions(matches)
        setText(text)
        //console.log(answer)
    }

    const onRestart = () => {
        
        document.getElementById('inputBox').disabled = false
        document.getElementById('inputBox').placeholder = "Guess " + count + " of 8"
        setSuggestions([])
        setText('')
        setGuess([])
        setCount(1)
        setGuesses([])
        onGetAnswer()
    }





    function Item({ children }) {
        const ref = useRef();
        //console.log(children)
      
        useEffect(() => {
          if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
          }
          //console.log(ref)
        }, []);
      
        return (

            <tr ref={ref}>
                <td className="teamColumn" style={{ background: answer.name.common === children.name.common ? "#37be75" : "white" }}><img src={children.flags.png} className="logo"></img><p className="teamName">{children.name.common}</p></td>
                <td className="teamColumn" style={{ background: answer.continents[0] === children.continents[0] ? "#37be75" : "white" }}>{children.continents[0]}</td>
                <td className="teamColumn" style={{ background: answer.subregion === children.subregion ? "#37be75" : "white" }}>{children.subregion}</td>
                <td className="teamColumn" style={
                            (()=> {
                                let a = Object.values(children.languages)
                                let b = Object.values(answer.languages)
                                let count = 0
                                for(let i = 0; i < a.length; i++){
                                    for(let j = 0; j < b.length; j++){
                                        if(a[i] === b[j])
                                            count += 1
                                    }
                                }
                                if(count === a.length) return {background: "#37be75"}
                                else if(count > 0) return {background: "#f4e878"}
                                
                                return {background: "white"}
                                
                            })()
                        }>
                    
                    {
                            (()=> {
                                let a = Object.values(children.languages)
                                //console.log("len a " + a.length)
                                //console.log("lista de linguas deste guess " + a)
                                let s  = ''
                                if(a.length > 1){
                                    for(let i = 0; i < a.length;i++){
                                        if(i === a.length-1)
                                            s += a[i]
                                        else {
                                            s += a[i]+"/ "
                                            //console.log("lingua " + i + ": " + a[i])
                                        }
                                    }
                                    
                                    return s
                                }
                                
                                return a[0]
                                
                            })()
                        }
                </td>
                <td className="teamColumn" style={
                            (()=> {
                                let a = Object.values(children.currencies)
                                let b = Object.values(answer.currencies)
                                if(a[0].symbol === b[0].symbol) return {background: "#37be75"}
                                else return {background: "white"}
                                
                            })()
                        }>
                    
                    {
                            (()=> {
                                let a = Object.values(children.currencies)
                                return a[0].symbol
                                
                            })()
                        }
                </td>
                <td className="teamColumn" style={{ background: answer.population === children.population ? "#37be75" : "white" }}>
                    <div className="bigger">
                        <p style={{display:"inline"}}>{children.population} </p>
                        {
                            (()=> {
                                
                                if( answer.population > children.population) return <i className="arrow-blue-up"></i>;
                                else if( answer.population < children.population) return <i className="arrow-blue-down"></i>;
                                else return "";
                                
                            })()
                        }
                    </div>
                </td>
                
            </tr>
          
        );
      }

    return (
        <div className="mb-3 container testes">
            
            <div className="boxA">
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
                    id="inputBox"
                    />
                <div className="containerBox" id="inputDiv">
                    {suggestions && suggestions.slice(0,6).map((suggestions, i ) =>
                    <div key={i}
                        id={"div"+i}
                        onClick={() => onGuessHandler(suggestions.name.common)}
                        className="col-md-12 justify-content-md-center suggestionBox">{suggestions.name.common}
                    </div>
                    )}
                </div>
            </div>

            <div className="mt-5 boxB">
                
                <Button variant="outlined" onClick={onRestart} className="mb-2">
                    Restart
                </Button>
                
                <Table striped bordered hover responsive className="tableCountrle">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Continent</th>
                            <th>Subregion</th>
                            <th>Language</th>
                            <th>Currency</th>
                            <th>Population</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guesses && guesses.map((guesses, i ) =>
                            <Item key={i}  id={"country"+i}
                            className="col-md-12 justify-content-md-center">{guesses}</Item>
                         )}
                    </tbody>
                </Table>
                
            </div>
        </div>
    )
}

