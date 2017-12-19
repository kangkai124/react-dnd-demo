import React from 'react'
import { DragSource } from 'react-dnd'

const boxSource = {
  beginDrag (props) {
    return {
      name: props.name
    }
  }
}

class Bamboo extends React.Component {
  render () {
    const { connectDragSource } = this.props
    return connectDragSource(
      <div className='bamboo'>
        {this.props.name}
      </div>
    )
  }
}

export default DragSource('bamboo', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Bamboo)
