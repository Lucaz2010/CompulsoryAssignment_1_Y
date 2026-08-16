import { APITester } from "./APITester";

import "./logo.css"
import logo from "./Y_ChatterLogo.png"
import {useEffect, useState} from "react";

export function App() {

  const [post, setPost] = useState()

  useEffect(() => {

    fetch('https://dummyjson.com/posts/').then(response => {
      response.json().then(json => {
        setPost(json)
      })
    })
  }, []);

  return (

      <div>

      <header>
        <img src={logo}  className="logo" width="240" />
      </header>
      <APITester />

    {JSON.stringify(post)}
        </div>
        );

        }





export default App;
