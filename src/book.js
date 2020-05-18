import React, { Component } from 'react'
import Shelf from './shelf'
export default class Datacenter extends Component {
    state = {
        current :[],
        want :[],
        read :[]
    }


    allselfinfo = () => {
       let data = this.props.shelfinfo
       console.log(data)
       
    }
    render() {
        return (
            <div>
                <Shelf />
            </div>
        )
    }
}

