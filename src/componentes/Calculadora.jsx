import Botao from "./Botao";
import Visor from "./Visor";
import "./Calculadora.css"
import { Component } from "react";

class Calculadora extends Component{    
    constructor(props){
        super(props)

        //INICIA O STATE DA CALCULADORA
        this.state = {
            novoNumero: true, //Quando novoNumero=true, então o próximo digito ocupa o visor
            operador: "",
            visor: "0",
            decimal: false,
            valorSwap: 0.0,
            ultimoValor: 0.0
        }
   }

   //ok
   limpa=(e)=>{
        this.setState({
            visor: "0", 
            operador: "", 
            decimal: false, 
            novoNumero: true, 
            valorSwap: 0.0, 
            ultimoValor: 0.0
        })
   }

   setOperador=(e)=>{
        //Valida o operador
        if(!"+-*/".includes(e)){
            return;
        }

        let valor = parseFloat(this.state.visor.replace(",","."));

        this.setState({
            operador: e,
            valorSwap: valor,
            novoNumero: true,
            ultimoValor: 0
        })
   }

   calcula=(e)=>{
    debugger
        let valor = 0;
        let valorVisor = parseFloat(this.state.visor.replace(",","."));
        let valorBase = (this.state.ultimoValor === 0 ? this.state.valorSwap : this.state.ultimoValor);
        switch(this.state.operador){
            case "+":            
                valor = e !== "%" 
                    ? valorBase + valorVisor
                    : valorBase + ((valorVisor / 100) * valorBase)
                break;
            case "-":
                valor = e !== "%" 
                    ? valorBase - valorVisor
                    : valorBase - ((valorVisor / 100) * valorBase)
                break;
            case "*":
                valor = e !== "%" 
                    ? valorBase * valorVisor
                    : valorBase * ((valorVisor / 100) * valorBase)
                break;
            case "/":
                valor = e !== "%" 
                    ? valorBase / valorVisor
                    : valorBase / ((valorVisor / 100) * valorBase)
                break;
            default:
                valor = 0;
        }

        //Atualiza valor
        this.setState({
            visor: valor.toString().replace(".",","),
            valorSwap: valorVisor,
            ultimoValor: this.state.ultimoValor === 0 
                ? valorVisor
                : this.state.ultimoValor
        });
   }

   calculaPorcentagem=()=>{

   }

   concatena=(e)=>{
        //Valores possíveis de concatenar
        let possiveisConcatenar = "0123456789,";
        if(!possiveisConcatenar.includes(e)){
            return;
        }

        //situações que não poderá concatenar
        if(e === "," && this.state.visor.includes(e) && this.state.operador === ""){
            return;
        }

        this.setState({
            visor: this.state.novoNumero 
                ? e === ","
                    ? "0,"
                    : e
                : this.state.visor + e,
            novoNumero: false
        });
   }

   inverteSinal=()=>{
        this.setState({
            visor:  (this.state.visor.toString().replace(",",".") * -1).toString().replace(".",",")
        });
   }

   render(){
       return(
           <div className="calculadora">
                <Visor>{this.state.visor}</Visor>
                <Botao handleClick={this.limpa} className="cinza">AC</Botao>
                <Botao handleClick={this.inverteSinal} className="cinza">+/-</Botao>
                <Botao handleClick={this.calcula}className="cinza">%</Botao>
                <Botao handleClick={this.setOperador}className="amarelo">/</Botao>
                <Botao handleClick={this.concatena}>7</Botao>
                <Botao handleClick={this.concatena}>8</Botao>
                <Botao handleClick={this.concatena}>9</Botao>
                <Botao handleClick={this.setOperador}className="amarelo">*</Botao>
                <Botao handleClick={this.concatena}>4</Botao>
                <Botao handleClick={this.concatena}>5</Botao>
                <Botao handleClick={this.concatena}>6</Botao>
                <Botao handleClick={this.setOperador}className="amarelo">-</Botao>
                <Botao handleClick={this.concatena}>1</Botao>
                <Botao handleClick={this.concatena}>2</Botao>
                <Botao handleClick={this.concatena}>3</Botao>
                <Botao handleClick={this.setOperador}className="amarelo">+</Botao>
                <Botao className="btnDuplo" handleClick={this.concatena}>0</Botao>
                <Botao handleClick={this.concatena}>,</Botao>
                <Botao handleClick={this.calcula} className="amarelo">=</Botao>
            </div>
        )
   }
}

export default Calculadora;