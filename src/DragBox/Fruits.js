import React from 'react'
import { DragSource } from 'react-dnd'

const boxSource = {
  beginDrag (props) {
    return {
      name: props.name
    }
  }
}

class Fruits extends React.Component {
  render () {
    const { connectDragSource } = this.props
    return connectDragSource(
      <div className='fruit'>
        {this.props.name}
      </div>
    )
  }
}

export default DragSource('field', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Fruits)
