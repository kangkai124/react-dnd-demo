import React from 'react'
import { DropTarget } from 'react-dnd'

const dustbinTarget = {
  drop (props, monitor) {
    props.onDrop(monitor.getItem().name)
  }
}

class Doge extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (evt) {
    this.props.onCancel(evt.target.previousSibling.innerHTML, 'doge')
  }
  render () {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div className='dog-wrap'>
        {
          this.props.content.map((ele, index) =>
            <div className='box dog-item' key={ele + index}>
              <span>{ele}</span>
              <div className='cancel' onClick={this.onClick}>x</div>
            </div>)
        }
      </div>
    )
  }
}

export default DropTarget('field', dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Doge)
