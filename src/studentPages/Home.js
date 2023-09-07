import React from "react";

const Home = (props) =>{
    const courseClicked = props.course;
    const courseID = props.courseID;
    return (
        <div>
            <div style={{ marginTop: '100px', marginLeft: '400px' }}>
            <h1> Welcome to course!</h1><br/>
            <p>Course Title : {courseClicked}</p>
            <p>ID : {courseID}</p>
            <p></p>
            </div>
        </div>
    )
}

export default Home;