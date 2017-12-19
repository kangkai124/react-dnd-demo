import React from 'react'
import { DropTarget } from 'react-dnd'

const dustbinTarget = {
  drop (props, monitor) {
    props.onDrop(monitor.getItem().name, props.content)
  }
}

class Rabbit extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (evt) {
    this.props.onCancel(evt.target.previousSibling.innerHTML)
  }
  render () {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div className='rabbit'>
        <div className='rabbit-item' style={{display: this.props.content ? 'block' : 'none'}}>
          <span>{this.props.content}</span>
          <div className='cancel' onClick={this.onClick}>x</div>
        </div>
      </div>
    )
  }
}

export default DropTarget('field', dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Rabbit)
