import React, { Component } from 'react'
import { connect } from 'react-redux'

class Categories extends Component {

    
    renderCategories = () => {
        if(this.props.storyCategories.length === 0){
            return (
                <li>Đang cập nhật</li>
            )
        }
        else{
            console.log(this.props.storyCategories);
            return this.props.storyCategories.map((item, index) => {
                return (
                    <li key={index}>{item.name}</li>
                )
            })
        }
    }
    render() {
        return (
            <ul>
                {this.renderCategories()}
            </ul>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storyCategories: state.storyCategories,
    }
}

export default connect(mapStateToProps, null)(Categories)