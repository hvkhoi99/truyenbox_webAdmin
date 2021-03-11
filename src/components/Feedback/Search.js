import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <div className="form-search fl-right">
            {/* <Link to="/author/add" id="add-category" className="fl-left">Thêm mới</Link> */}
            <input type="submit" value="Tìm kiếm" />
            <input type="text" name="name"  placeholder={''}/>
        </div>
        )
    }
}
