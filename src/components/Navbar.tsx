import {useState} from "react";
import {Link} from "react-router";

interface NavbarProps {
    onSearch:(query:string) => void;
}
export function Navbar({onSearch}: NavbarProps) {
    const [query, setQuery] = useState("");

    return (
    <div className="navbar bg-base-100 shadow-sm px-4 ">
        <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
              Y/Chatter
            </Link>
        </div>
        <div className="flex-none">
            <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search,or use #tag"
            className="input input-bordered w-full max-w-xs"
            onKeyDown={(e)=>{
                if(e.key === "Enter"){
                    onSearch(query);
                }
            }}

            />

        </div>
    </div>
);
            }