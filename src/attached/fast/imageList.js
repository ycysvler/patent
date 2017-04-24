/**
 * Created by xiao on 2017/4/4.
 */
import React from 'react';
import {Popover} from 'antd';
import './fast.css'

class ImageList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageUrls:this.props.imageUrls
        }
    }
    renderOneImage(url) {
        return <div>
            <img src={window.server_address+"/"+url} />
        </div>
    }
    render() {
        let self = this;
        return (
            <div style={{width:"0",height:"auto"}}>
                {
                    self.state.imageUrls.map(function(url) {
                        return <Popover key={url} content={self.renderOneImage(url)}>
                            <img style={{width:"50px",height:"50px"}} src={window.server_address+"/"+url} />
                        </Popover>
                    })
                }
            </div>
        )
    }
}

export default ImageList;