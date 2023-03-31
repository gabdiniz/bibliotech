import { Spinner } from "react-bootstrap";
import logoIcon from "./../../assets/icons/livros.png";


export function Splash() {
    return (
                <div>
                    <img src={logoIcon} className="rounded" alt="logo Icon"></img>
                    <h1><i><b>bibliotech</b></i></h1>
                    <h2>O melhor local para alugar livros.</h2>
                        <button type="button" className="btn btn-success mw-11">
                            <Spinner variant="dark"></Spinner> 
                        </button>
                </div>
    );
}