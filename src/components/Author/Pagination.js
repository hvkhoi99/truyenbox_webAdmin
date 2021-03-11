import React, { Component } from 'react';
import {
    Link
} from "react-router-dom";

export default class Pagination extends Component {
    render() {
        return (
            <div className="paging">
                <ul id="list-paging" className="fl-right">
                    <li>
                        <Link to='/'>&lt;</Link>
                    </li>
                    <li className="paging-active">
                        <Link to='/'>1</Link>
                    </li>
                    <li>
                        <Link to='/'>2</Link>
                    </li>
                    <li>
                        <Link to='/'>3</Link>
                    </li>
                    <li>
                        <Link to='/'>4</Link>
                    </li>
                    <li>
                        <Link to='/'>&gt;</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
