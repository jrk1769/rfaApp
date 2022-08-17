import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import axios from "axios";
import SkillSet from "./SkillSet";

import { roleOptions, genderOptions, skillOptions } from "../helpers/constants";

function Form(props) {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passport, setPassport] = useState("");
  const [skills, setSkills] = useState([]);
  const [role, setRole] = useState("");
  const [numbers, setNumbers] = useState([{ value: "" }]);
  const [cars, setCars] = useState([{ value: "" }]);
  const [about, setAbout] = useState("");
  const [picture, setPicture] = useState();

  const changeFile = (e) => {
    setPicture(URL.createObjectURL(e.target.files[0]));
  };

  const changeFName = (e) => {
    setFName(e.target.value);
  };
  const changeLName = (e) => {
    setLName(e.target.value);
  };
  const changeBday = (e) => {
    setBirthDay(e.target.value);
  };
  const changeGender = (e) => {
    setGender(e.target.value);
  };
  function handleNumberChange(i, event) {
    const values = [...numbers];
    values[i].value = event.target.value;
    setNumbers(values);
  }

  function handleNumberAdd() {
    const values = [...numbers];
    values.push({ value: null });
    setNumbers(values);
  }
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const changePassport = (e) => {
    setPassport(e.target.value);
  };

  const changeSkills = (e) => {
    let skillUpdated = e.map((skill) => skill.value);
    let tempSkills = [...skills, skillUpdated];
    setSkills(tempSkills[tempSkills.length - 1]);
  };
  const changeRole = (e) => {
    setRole(e.target.value);
  };
  function handleCarChange(i, event) {
    const values = [...cars];
    values[i].value = event.target.value;
    setCars(values);
  }

  function handleCarAdd() {
    const values = [...cars];
    values.push({ value: null });
    setCars(values);
  }
  const changeAbout = (e) => {
    setAbout(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let nameValidator = /^[a-zA-Z]+$/;
    let passportValidator = /^[A-Za-z0-9]*$/;
    let flag = 0;

    if (picture === undefined) {
      window.alert("Kidnly upload a profile picutre");
      flag += 1;
    }

    if (!nameValidator.test(fName)) {
      window.alert("Invalid FirstName");
      flag += 1;
    }
    if (!nameValidator.test(lName)) {
      window.alert("Invalid Surname");
      flag += 1;
    }
    if (password.length < 6) {
      window.alert("Minimum Password length is 6");
    }
    if (password !== confirmPassword) {
      window.alert("Passwords doesn't match");
      flag += 1;
    }
    if (!passportValidator.test(passport)) {
      window.alert("Passport series contains only numbers and letters");
      flag += 1;
    }
    if (skills.length === 0) {
      window.alert("Atleast one skill must be selected");
      flag += 1;
    }

    if (about.length < 15) {
      window.alert("Minimum 15 characters required");
      flag += 1;
    }
    if (flag === 0) {
      const dataObj = {
        fName: fName,
        lName: lName,
        bDay: birthDay,
        gender: gender,
        number: numbers.map((num) => num.value),
        email: email,
        password: password,
        passportSeries: passport,
        skills: skills,
        role: role,
        cars: cars.map((car) => car.value),
        about: about,
        picture: picture,
      };
      axios
        .post(
          "https://webhook.site/67ca1ff8-6631-408f-a131-78fa99df2fce",
          dataObj,
          {
            "Content-Type": "text/plain",
          }
        )
        .then((res) => console.log("Response submitted successfully"))
        .catch((err) => console.error("Error : ", err));
      console.log(dataObj);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="rfaForm">
      <Grid container spacing={7}>
        <Grid item xs={12} sm={2} md={3} lg={4}>
          <Stack direction="column" spacing={2}>
            <Avatar
              alt={picture ? "Profile" : "NA"}
              src={picture ? picture : ""}
              sx={{ width: 120, height: 120 }}
              style={{ margin: "auto" }}
            />
            <Button size="medium" component="label">
              Upload Photo
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={changeFile}
                id="myFile"
              />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={8}>
          <div className="inputField">
            <label>Firstname</label>
            <TextField
              error={
                fName.length !== 0
                  ? /^[a-zA-Z]+$/.test(fName)
                    ? false
                    : true
                  : false
              }
              className="field"
              label="Firstname"
              type="text"
              value={fName}
              onChange={changeFName}
              helperText={
                fName.length !== 0
                  ? /^[a-zA-Z]+$/.test(fName)
                    ? ""
                    : "This name is not available"
                  : ""
              }
              required
            />
          </div>
          <div className="inputField">
            <label>Surname</label>
            <TextField
              error={
                lName.length !== 0
                  ? /^[a-zA-Z]+$/.test(lName)
                    ? false
                    : true
                  : false
              }
              className="field"
              label="Surname"
              type="text"
              value={lName}
              onChange={changeLName}
              helperText={
                lName.length !== 0
                  ? /^[a-zA-Z]+$/.test(lName)
                    ? ""
                    : "This name is not available"
                  : ""
              }
              required
            />
          </div>
          <div className="inputField">
            <label>Birthday</label>
            <TextField
              className="field"
              type="date"
              value={birthDay}
              onChange={changeBday}
              required
            />
          </div>
          <div className="inputField">
            <label>Gender</label>
            <TextField
              className="field"
              select
              required
              label="Gender"
              value={gender}
              onChange={changeGender}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="inputField">
            <label>Contact Number</label>
            <div className="additional field">
              <div className="multipleInputDiv">
                {numbers.map((field, idx) => {
                  return (
                    <TextField
                      key={idx}
                      className="field multipleInput"
                      label="Number"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => handleNumberChange(idx, e)}
                      onWheelCapture={(e) => e.target.blur()}
                      required
                    />
                  );
                })}
              </div>
              <Button
                variant="outlined"
                className="button"
                onClick={() => handleNumberAdd()}
              >
                +
              </Button>
            </div>
          </div>
          <div className="inputField">
            <label>Email</label>
            <TextField
              className="field"
              label="Email"
              type="email"
              value={email}
              onChange={changeEmail}
              required
            />
          </div>
          <div className="inputField">
            <label>Password</label>
            <TextField
              error={password.length >= 6 ? false : true}
              className="field"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={changePassword}
              helperText={
                password.length >= 6 ? "" : "Minimum 6 characters required"
              }
              required
            />
          </div>
          <div className="inputField">
            <label>Confirm Password</label>
            <TextField
              error={password === confirmPassword ? false : true}
              className="field"
              label="Confirm Password"
              type="password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
              helperText={
                password === confirmPassword ? "" : "Passwords dont match"
              }
              required
            />
          </div>
          <div className="inputField">
            <label>Passport Series</label>
            <TextField
              error={/^[A-Za-z0-9]*$/.test(passport) ? false : true}
              className="field"
              label="Passport series"
              type="text"
              value={passport}
              onChange={changePassport}
              helperText={
                /^[A-Za-z0-9]*$/.test(passport)
                  ? ""
                  : "Only numbers and characters"
              }
              required
            />
          </div>
          <div className="inputField">
            <label>Skill Set</label>
            <SkillSet options={skillOptions} onChange={changeSkills} />
          </div>
          <div className="inputField">
            <label>Role</label>
            <TextField
              className="field"
              select
              required
              label="Role"
              value={role}
              onChange={changeRole}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="inputField">
            <label>Number of Cars</label>
            <div className="additional field">
              <div className="multipleInputDiv">
                {cars.map((field, idx) => {
                  return (
                    <TextField
                      key={idx}
                      className="field multipleInput"
                      label="Cars"
                      type="text"
                      required
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => handleCarChange(idx, e)}
                    />
                  );
                })}
              </div>
              <Button
                variant="outlined"
                className="button"
                onClick={() => handleCarAdd()}
              >
                +
              </Button>
            </div>
          </div>
          <div className="inputField">
            <label>About Info</label>
            <TextField
              error={about.length >= 15 ? false : true}
              className="field"
              label="About You"
              placeholder="About You"
              multiline
              rows={4}
              value={about}
              onChange={changeAbout}
              helperText={about.length >= 15 ? "" : "Minimum 15 characters"}
              required
            />
          </div>
          <div className="buttonContainer">
            <Button variant="contained" type="submit">
              Save
            </Button>
            <Button variant="outlined" onClick={props.resetForm}>
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default Form;
