import React, {Component} from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'


const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: [null],
    values: [0, 0], //dois valores a serem operados
    current: 0 //qual índice do array está manipulando
}



export default class Calculator extends Component {


    state = {...initialState}

    //pode-se usar constructor ao invés de arrow function
    // constructor(props){
    //     super(props)

    //     this.clearMemory = this.clearMemory.bind(this)
    //     this.setOperation = this.setOperation.bind(this)
    //     this.addDigit = this.addDigit.bind(this)
    // }


    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current === 0){
            this.setState({operation, current: 1, clearDisplay: true})
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)   //o eval é perigoso, mas obviamente pode ser trocado por um switch de acordo com a operação
            } catch(e){
                values[0] = this.state.values[0]
            }
            
            //fazendo o eval ele pega a expressão literalmente em javascript
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null: operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n){
        if(n === '.' && this.state.displayValue.includes('.')){ //impedir um número com dois pontos
            return
        }

        const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay  //momentos em que vai limpar a calculadora: 0 na frente ou indo pro segundo numero

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({displayValue, clearDisplay: false})

        if(n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
    }


    render(){

        //criou-se arrow-functions para resolver o problema do this, apenas, que aí ele pega as funções declaradas da classe
        const addDigit = n => this.addDigit(n)
        const setOperation = op => this.setOperation(op)

        return (
            <div className='calculator'> {/*class é palavra reservada em JS, então usar className */}
                <Display value={this.state.displayValue}/>
                <Button label="AC" triple click={() => this.clearMemory()} />
                <Button label="/" click={setOperation /*Aqui dentro é java*/ } operation />
                <Button label="7" click={addDigit}  />
                <Button label="8" click={addDigit} />
                <Button label="9" click={addDigit} />
                <Button label="*" click={setOperation} operation />
                <Button label="4" click={addDigit} />
                <Button label="5" click={addDigit} />
                <Button label="6" click={addDigit} />
                <Button label="-" click={setOperation} operation />
                <Button label="1" click={addDigit} />
                <Button label="2" click={addDigit} />
                <Button label="3" click={addDigit} />
                <Button label="+" click={setOperation} operation />
                <Button label="0" click={addDigit} double />
                <Button label="." click={addDigit} />
                <Button label="=" click={setOperation} operation />
               
            </div>
        )
    }
}

