import React, { Component } from 'react'
import './App.css'

import Fruits from './DragBox/Fruits'
import Bamboo from './DragBox/Bamboo'
import Rabbit from './DropBox/Rabbit'
import Doge from './DropBox/Doge'
import Cat from './DropBox/Cat'
import Panda from './DropBox/Panda'

import rabbit from './assets/rabbit.png'
import dog from './assets/doge.png'
import cat from './assets/cat.png'
import panda from './assets/panda.png'

import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fruits: ['🍎', '🍉', '🍊', '🍌', '🍍', '🥝', '🥑', '🍈', '🍇', '🍓'],
      bamboo: ['🍢', '🍡', '🍭'],
      rabbit: '',
      doge: [],
      cat: [],
      panda: []
    }

    this.onRabbitDropped = this.onRabbitDropped.bind(this)
    this.onPandaDropped = this.onPandaDropped.bind(this)
    this.onDogeDropped = this.onDogeDropped.bind(this)
    this.onCatDropped = this.onCatDropped.bind(this)
    this.cancelField = this.cancelField.bind(this)
    this.onPandaCancel = this.onPandaCancel.bind(this)
    this.onRabbitCancel = this.onRabbitCancel.bind(this)
  }

  onRabbitDropped (newValue, oldValue) {
    const { fruits } = this.state
    let newFields
    newFields = fruits.filter(e => e !== newValue)
    if (oldValue) {
      newFields.unshift(oldValue)
    }
    this.setState({
      rabbit: newValue,
      fruits: newFields
    })
  }

  onDogeDropped (value) {
    const newY1 = [...this.state.doge]
    newY1.push(value)
    this.setState({
      doge: newY1,
      fruits: this.state.fruits.filter(e => e !== value)
    })
  }

  onCatDropped (value) {
    const newY2 = [...this.state.cat]
    newY2.push(value)
    this.setState({
      cat: newY2,
      fruits: this.state.fruits.filter(e => e !== value)
    })
  }

  cancelField (value, axis) {
    const newValue = [...this.state.fruits]
    newValue.unshift(value)
    this.setState({
      fruits: newValue,
      [axis]: this.state[axis].filter(e => e !== value)
    })
  }

  onPandaDropped (value) {
    const newPanda = [...this.state.panda]
    newPanda.push(value)
    this.setState({
      panda: newPanda,
      bamboo: this.state.bamboo.filter(e => e !== value)
    })
  }

  onPandaCancel (value) {
    const newBamboo = [...this.state.bamboo]
    newBamboo.unshift(value)
    this.setState({
      bamboo: newBamboo,
      panda: this.state.panda.filter(e => e !== value)
    })
  }

  onRabbitCancel (value) {
    const newFruits = [...this.state.fruits]
    newFruits.unshift(value)
    this.setState({
      fruits: newFruits,
      rabbit: ''
    })
  }

  render () {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div id='content'>
          <a href='https://github.com/kangkai124/react-dnd-demo'>
            <img style={{position: 'absolute', top: 0, right: 0, border: 0}} src='https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67' alt='Fork me on GitHub' data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png' />
          </a>
          <div id='main'>
            <div className='left'>
              <div className='vertical-box'>
                <div>fruits</div>
              </div>
              <div className='variables vertical-box'>
                {
	                this.state.fruits.map(ele => <Fruits key={ele} name={ele} type='field' />)
	              }
              </div>
              <div className='vertical-box'>
                <div>bamboo</div>
              </div>
              <div className='wind vertical-box'>
                {this.state.bamboo.map(ele => <Bamboo key={ele} name={ele} type='bamboo' />)}
              </div>
            </div>
            <div className='right'>
              <div className='x-axis'>
                <img src={rabbit} height='20' alt='rabbit' />
                <div className='rabbit-wrap'>
                  <Rabbit content={this.state.rabbit} onDrop={this.onRabbitDropped} onCancel={this.onRabbitCancel} />
                </div>
              </div>
              <div className='dog-logo'>
                <img src={dog} height='20' alt='dog' />
              </div>
              <Doge content={this.state.doge} onDrop={this.onDogeDropped} onCancel={this.cancelField} />
              <div className='cat-logo'>
                <img src={cat} height='20' alt='cat' />
              </div>
              <Cat content={this.state.cat} onDrop={this.onCatDropped} onCancel={this.cancelField} />
              <div className='cat-logo'>
                <img src={panda} height='20' alt='panda' />
              </div>
              <Panda content={this.state.panda} onDrop={this.onPandaDropped} onCancel={this.onPandaCancel} />
            </div>
            <div className='aside'>
              <div>
	              rabbit eats：
                <div>{this.state.rabbit}</div>
              </div>
              <div>
	              doge eats：{this.state.doge.map(e => <div key={e}>{e}</div>)}
              </div>
              <div>
	              cat eats：{this.state.cat.map(e => <div key={e}>{e}</div>)}
              </div>
              <div>
	              panda eats：{this.state.panda.map(e => <div key={e}>{e}</div>)}
              </div>
            </div>
          </div>
          <div id='words'>
            <b>说明：</b>
            <p>
							水果中的元素只能拖到&nbsp;
              <img src={rabbit} width='20' alt='rabbit' />&nbsp;
              <img src={dog} width='20' alt='dog' />&nbsp;
              <img src={cat} width='20' alt='cat' />&nbsp;
							中
            </p>
            <p>竹子中的元素只能拖到&nbsp;<img src={panda} width='20' alt='panda' />&nbsp;中</p>
            <p>
              <img src={rabbit} width='20' alt='rabbit' /> 只接收一种水果
            </p>
            <p>
              <img src={dog} width='20' alt='dog' />&nbsp;
              <img src={dog} width='20' alt='cat' />&nbsp;
              <img src={panda} width='20' alt='panda' />&nbsp; 接收多种水果
            </p>
          </div>
        </div>
      </DragDropContextProvider>
    )
  }
}

export default App
