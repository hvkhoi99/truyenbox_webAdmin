import React, { Component, useState } from 'react'



function Example(){
    const [post, setPost] = useState([{id: 1, name: 'a'},{id: 1, name: 'b'}])
    return (
        <div>
            {post.map(item =>{
                return <span>{item.name}</span>
            })}
        </div>
    )
}

export default  Example;