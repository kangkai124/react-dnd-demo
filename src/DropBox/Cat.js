import React from 'react'
import { DropTarget } from 'react-dnd'

const dustbinTarget = {
  drop (props, monitor) {
    props.onDrop(monitor.getItem().name)
  }
}

class Cat extends React.Component {
  constructor (props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }

  onClick (evt) {
    this.props.onCancel(evt.target.previousSibling.innerHTML, 'cat')
  }
  render () {
    const { connectDropTarget } = this.props
    return connectDropTarget(
      <div className='dog-wrap'>
        {
          this.props.content.map((ele, index) =>
            <div className='box cat-item' key={ele + index}>
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
}))(Cat)
