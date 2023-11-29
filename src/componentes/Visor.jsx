import "./Visor.css"

export default function Visor(props){
    return(
        <div className="visor">
            {props.children}
        </div>
    )
}