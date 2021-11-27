import React, { useState } from 'react';
function CreateProject(props) {
  const {addProjectInfor} = props;
  const [projectName, setProjectName] = useState("")
  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.value.replace(/\s/g, '');
    setProjectName(name)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addProjectInfor({name:projectName})
  }
  return (
    <div className="create-project">
      <div className="create-container">
        <h4>Set up your project</h4>
        <h5>Start by choosing a name for the project</h5>
        <form onSubmit={handleSubmit}>
          <label>Project name</label>
          <input type="text"
            name="projectName"
            value={projectName}
            onChange={handleChange}
            placeholder="Use your client company name,if you will*"></input>
          <span>*remember this project will be shared with your team members and client</span>
          <button disabled={projectName.length === 0} type="submit" className={`btn-yallow ${projectName.length > 0 ? "active" : ""}`}>Create project</button>
        </form>
      </div>
    </div>

  );
}

export default CreateProject;