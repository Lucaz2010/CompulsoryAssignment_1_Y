import "./index.css"
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
      <main className="min-h-screen bg-base-200 flex items-center justify-center p-8">
        <div className="card bg-base-100 w-full max-w-md shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-3xl">
              Y Chatter
            </h1>

            <p>
              Tailwind CSS and daisyUI are working!
            </p>

            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                Awesome!
              </button>
            </div>
          </div>
        </div>
      </main>
      /*
      <div>
        <header>
          <img src={logo} className="logo" width="240" />
        </header>
        {
          JSON.stringify(post)
        }
      </div>
       */
  );
}

export default App;
