import React from 'react';

import '../../attached/common/css.css';
import './zone.css'


export default class CutImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {data: []};

        window.onmousemove = this.onMouseMove;
        window.onmouseup = this.onMouseUp;
    }

    componentWillUnmount() {
        window.onmousemove = null;
        window.onmouseup = null;
    }

    dragdiv = {mouseDown: false, begin: {x: 0, y: 0}, position: {x: 0, y: 0}}
    dragbar = {mouseDown: false, begin: {x: 0, y: 0}, size: {width: 100, height: 100}}

    onDragDivMouseDown = (event) => {
        event = event.nativeEvent;
        window.document.body.style['user-select']='none';

        this.dragdiv.mouseDown = true;
        this.dragdiv.begin = {x: parseInt(event.screenX), y: parseInt(event.screenY)};
        this.dragdiv.position = {x: parseInt(event.target.style.left), y: parseInt(event.target.style.top)};
    }

    onDragBarMouseDown = (event) => {
        event = event.nativeEvent;
        window.document.body.style['user-select']='none';

        this.dragbar.mouseDown = true;
        this.dragbar.begin = {x: parseInt(event.screenX), y: parseInt(event.screenY)};
        this.dragbar.size = {width:parseInt(this.refs.drag.style.width), height:parseInt(this.refs.drag.style.height)};
    }

    onMouseUp = (event) => {
        window.document.body.style['user-select']='';
        this.dragdiv.mouseDown = false;
        this.dragbar.mouseDown = false;
    }
    onMouseMove = (event) => {
        this.onDragDivMove(event);
        this.onDragBarMove(event);
    }

    onDragBarMove=(event)=>{
        if (this.dragbar.mouseDown) {
            let point = {x: event.screenX - this.dragbar.begin.x, y: event.screenY - this.dragbar.begin.y};
            let div_x = parseInt(this.refs.drag.style.left);
            let div_y = parseInt(this.refs.drag.style.top);

            let width = this.dragbar.size.width + point.x;
            let height = this.dragbar.size.height + point.y;

            width = width < 20 ? 20 : width;
            width = width + div_x > 300 ? 300 - div_x: width;

            height = height < 20 ? 20 : height;
            height = height + div_y > 300 ? 300 - div_y: height;

            this.refs.drag.style.width = width + 'px';
            this.refs.drag.style.height = height + 'px';
        }
    }

    onDragDivMove=(event)=>{
        if (this.dragdiv.mouseDown) {
            let point = {x: event.screenX - this.dragdiv.begin.x, y: event.screenY - this.dragdiv.begin.y};
            let width = parseInt(this.refs.drag.style.width);
            let height = parseInt(this.refs.drag.style.height);

            let x = (this.dragdiv.position.x + point.x);
            let y = (this.dragdiv.position.y + point.y);

            x = x < 0 ? 0 : x;
            x = x + width > 300 ? 300 - width : x;
            this.refs.drag.style.left = x + 'px';

            y = y < 0 ? 0 : y;
            y = y + height > 300 ? 300 - height : y;
            this.refs.drag.style.top = y + 'px';
        }
    }



    render() {
        let self = this;

        return (
            <div className="cutimage"  >
                <div ref="image" id="image" >
                    <div ref="drag" style={{left: 100, top: 100, width: 100, height: 100}} id="drag"  onMouseDown={this.onDragDivMouseDown}>
                        <div ref="bar" id="bar" style={{width: 6, height: 6, background: '#fff'}} onMouseDown={this.onDragBarMouseDown} ></div>
                    </div>
                </div>
            </div>
        );
    }
}




