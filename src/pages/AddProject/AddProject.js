import React from 'react';

function AddProject(props) {
  const {addProjectInfor} = props;

  const handleClick = () =>{
    addProjectInfor()
  }
  return (
    <div className="add-project">
      <div className="add-container">
        <h4>Welcome to 23rdC,<span>Elisa!</span></h4>
        <button onClick={handleClick}>Create a new project</button>
      </div>
    </div>
  );
}

export default AddProject;