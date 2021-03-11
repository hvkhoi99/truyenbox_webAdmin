import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Search extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state= {
    //         id: ''
    //     }
    // }
    
    // componentDidMount() {
    //     var { match } = this.props;
    //     if (match) {
    //         var id = match.params.id;
    //         this.setState({
    //             id: id
    //         })
    //     }
    // }
    render() {
        return (
            <div className="form-search fl-right">
                <Link to={`/chapter/add/story/${this.props.id}`} id="add-category" className="add-chapter">Thêm chương mới</Link>
                <input type="submit" value="Tìm kiếm" />
                <input type="text" />
            </div>
        )
    }
}
