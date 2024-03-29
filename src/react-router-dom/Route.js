import React, { Component } from 'react'
import {Consumer} from './context';
import pathToReg from 'path-to-regexp';
export default class Route extends Component {
    render() {
        return (
            <Consumer>
                {
                    (value)=>{
            
                        let {pathname} = value.location
                        let {path,component:Component,exact} = this.props;
                        let reg = pathToReg(path,[],{end:exact||false})
                        if(reg.test(pathname)){
                            return <Component {...value}/>
                            {/* return React.createElement(component,value) */}
                        }
                        return null;
                    }
                }
            </Consumer>
        )
    }
}