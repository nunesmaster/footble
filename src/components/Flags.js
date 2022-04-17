import React from "react"
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react'
import axios from 'axios'
import Image from 'react-bootstrap/Image'

export default function Flags(){

    const [country, setCountry] = useState([])
    const [guess, setGuess] = useState({})
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [answer, setAnswer] = useState({})
    const [count, setCount] = useState(0)
    const [index, setIndex] = useState(0)
    const [flag, setFlag] = useState('')
    const [list, setList] = useState([])
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [iterator, setIterator] = useState(0);
    const [lastMove, setLastMove] = useState('')

    useEffect(() => {
        let interval = null;
      
        if (isActive && isPaused === false) {
          interval = setInterval(() => {
            setTime((time) => time + 10);
          }, 10);
        } else {
          clearInterval(interval);
        }
        return () => {
          clearInterval(interval);
        };
      }, [isActive, isPaused]);

    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(res => {

                console.log(res)
                let x  = res.data.filter(function (el) {
                    return el.independent
                  });
                setCountry(x)
                
                let i = Math.floor(Math.random() * (x.length - 1)) + 0;
                //console.log(i)
                setIndex(i)
                setAnswer(x[i])
                setFlag(x[i].flags.png)
                setList([...list , i])
            })
            .catch(error => {
                console.log(error)
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
        if(answer.name.common === matches[0].name.common){

            setCount(count + 1)
        }
        

        else{
            handleReset()
            setCount(0)
            setList([])
            
        }
            
        let i = Math.floor(Math.random() * (country.length - 1)) + 0;
        
        while(list.includes(i))
            i = Math.floor(Math.random() * (country.length - 1)) + 0;
        

        if(list.length === country.length){
            
            handleReset()
            setCount(0)
            setList([])
        }


        setIndex(i)
        setFlag(country[i].flags.png)
        setList([...list , i])
        setAnswer(country[i])
        setText('')
        console.log(answer)
    }


    const onChangeHandler = (text) => {
        
        handleStart()
        document.getElementById('inputDiv').style.display = "block"
        let matches = []
        if(text.length > 0){
            matches = country.filter(country=>{
                const regex = new RegExp(`${text}`, "gi")
                return country.name.common.match(regex)
            })
        }
        setSuggestions(matches)
        setText(text)
        console.log(answer)
    }

    function Timer(props) {
        return (
          <div className="timer">
            <span className="digits">
              {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
            </span>
            <span className="digits">
              {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
            </span>
            <span className="digits mili-sec">
              {("0" + ((props.time / 10) % 100)).slice(-2)}
            </span>
          </div>
        );
      }

      const handleStart = () => {
        setIsActive(true);
        setIsPaused(false);
      };
      
      const handlePauseResume = () => {
        setIsPaused(!isPaused);
      };
      
      const handleReset = () => {
        setIsActive(false);
        setTime(0);
      }



    return (
        <div className="mb-3 container testes">
            
            <div className="boxA testes2">
                <div className="stop-watch">
                    <Timer time={time} />
                </div>
                <div>
                    <Button onClick={_ => setIndex(index+1)} variant="outlined"  className="mb-2">
                        Restart
                    </Button>
                </div>
                <h1>Streak {count}</h1>
                <div className="imgBox">
                    <Image src={flag} className="guessLogo fluid mb-4"></Image>
                </div>
                <input 
                    className="inputPlayer col-md-12 input" 
                    placeholder="Type here" 
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
                        id={"div" + i}
                        onClick={() => onGuessHandler(suggestions.name.common)}
                        className="col-md-12 justify-content-md-center suggestionBox">{suggestions.name.common}
                    </div>
                    )}
                </div>
                
            </div>

            
        </div>
    )
}

