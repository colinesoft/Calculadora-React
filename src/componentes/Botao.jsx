import "./Botao.css";

export default function Botao(props){
    return(
        <button className={props.className} onClick={
            props.handleClick!==undefined
                ? ()=>props.handleClick(props.children)
                : null
            }>
            {props.children}
        </button>
    )
}