import React from "react";
import Select from "react-select";

function SkillSet(props) {
  return (
    <Select
      onChange={props.onChange}
      isMulti
      name="options"
      options={props.options}
      className="basic-multi-select field"
      classNamePrefix="select"
      required
    />
  );
}

export default SkillSet;
