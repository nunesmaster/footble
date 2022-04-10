import React from "react"
import {Table} from "react-bootstrap"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from 'react'
import axios from 'axios'

export default function Main(){

    const [country, setCountry] = useState([])
    const [guess, setGuess] = useState({})
    const [guesses, setGuesses] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [answer, setAnswer] = useState({})
    const [count, setCount] = useState(1)

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {

                setCountry(res.data)
                let i = Math.floor(Math.random() * (res.data.length - 1)) + 0;
        
                
                setAnswer(res.data[i])
            })

    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    const onSuggestHandler = (text) => {
        setText(text);
        setSuggestions([]);
    }

    const onGameOver = () => {

        document.getElementById('inputBox').disabled = true
        document.getElementById('inputBox').placeholder = "Game Over"
    }

    const onGameWon= () => {
        
        document.getElementById('inputBox').placeholder = "You won!"
        document.getElementById('inputBox').disabled = true
    }

    const onGuessHandler = (text) => {
        let matches = []
        if(text.length > 0){
            matches = country.filter(country => {
                return country.name.common === text
            })
        }
        console.log(answer.name.common)
        console.log(matches[0].name)
        if(answer.name.common === matches[0].name.common){
            handleClickOpen()
            onGameWon()
        }
        if(count === 8){
            onGameOver()
            handleClickOpen()
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
        let matches = []
        if(text.length > 0){
            matches = country.filter(country=>{
                const regex = new RegExp(`${text}`, "gi")
                return country.name.common.match(regex) && !guesses.includes(country)
            })
        }
        setSuggestions(matches)
        setText(text)
        console.log(answer)
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
                id="inputBox"
                />
                {suggestions && suggestions.map((suggestions, i ) =>
                <div key={i}
                    onClick={() => onGuessHandler(suggestions.name.common)}
                    className="col-md-12 justify-content-md-center suggestionBox">{suggestions.name.common}</div>
            )}

            <div className="mt-5">
                <Table striped bordered hover responsive >
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
                        <tr key={i}
                            className="col-md-12 justify-content-md-center">
                            <td className="teamColumn" style={{ background: answer.name.common === guesses.name.common ? "#37be75" : "#edeae5" }}><img src={guesses.flags.png} className="logo"></img><p className="teamName">{guesses.name.common}</p></td>
                            <td className="teamColumn" style={{ background: answer.continents[0] === guesses.continents[0] ? "#37be75" : "#edeae5" }}>{guesses.continents[0]}</td>
                            <td className="teamColumn" style={{ background: answer.subregion === guesses.subregion ? "#37be75" : "#edeae5" }}>{guesses.subregion}</td>
                            <td className="teamColumn" style={
                                        (()=> {
                                            let a = Object.values(guesses.languages)
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
                                            
                                            return {background: "#edeae5"}
                                            
                                        })()
                                    }>
                                
                                {
                                        (()=> {
                                            let a = Object.values(guesses.languages)
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
                                            let a = Object.values(guesses.currencies)
                                            let b = Object.values(answer.currencies)
                                            if(a[0].symbol === b[0].symbol) return {background: "#37be75"}
                                            else return {background: "#edeae5"}
                                            
                                        })()
                                    }>
                                
                                {
                                        (()=> {
                                            let a = Object.values(guesses.currencies)
                                            return a[0].symbol
                                            
                                        })()
                                    }
                            </td>
                            <td className="teamColumn" style={{ background: answer.population === guesses.population ? "#37be75" : "#edeae5" }}>
                                <div className="bigger">
                                    <p style={{display:"inline"}}>{guesses.population} </p>
                                    {
                                        (()=> {
                                            
                                            if( answer.population > guesses.population) return <i className="arrow-blue-up"></i>;
                                            else if( answer.population < guesses.population) return <i className="arrow-blue-down"></i>;
                                            else return "";
                                            
                                        })()
                                    }
                                </div>
                            </td>
                            
                        </tr>
                         )}
                    </tbody>
                </Table>
                <Button variant="outlined" onClick={onRestart}>
                    Restart
                </Button>
                <Dialog
                    selectedValue="teste"
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle id="alert-dialog-title">
                     The correct answer was 
                    </DialogTitle>
                    <DialogContent>
                        <div className="answerDialog">
                        </div>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

