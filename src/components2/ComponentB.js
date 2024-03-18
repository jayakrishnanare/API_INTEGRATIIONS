import React from "react";
import { UserContext } from "../App";
function ComponenentB() {
  return (
    <div>
      <h1>Tthis is component B</h1>
      <UserContext.Consumer>{(studentDetails) => (
        <div>
            <h1>name : {studentDetails.name}</h1>
            <h1>age : {studentDetails.age}</h1>
            <h1>job : {studentDetails.job}</h1>
        </div>
      )}</UserContext.Consumer>
    </div>
  );
}

export default ComponenentB;
