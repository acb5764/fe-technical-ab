import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  makeStyles,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { FaArrowLeft } from "react-icons/fa";
import "./stylish.css";

function Home() {
  const [patient, setPatient] = useState(0);
  const [firstName, setFirstName] = useState(0);
  const [lastName, setLastName] = useState(0);
  const [birthGender, setBirthGender] = useState(0);
  const [birthDate, setBirthDate] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [address, setAddress] = useState(0); //There is probably a better way to do this.. But it works! If you know of a better way I could have done this, I am eager to learn.
  const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
    tableContainer: {
      width: "60%",
      marginLeft: "330px",
      backgroundColor: "aliceblue",
    },
    heading: {
      marginLeft: "330px",
      color: "#2E3586",
      margin: "10px 0px",
      fontSize: "28px",
      lineHeight: "34px",
    },
    root: {
      position: "fixed",
      top: 130,
      left: 330,
      zIndex: 1,
    },
    paper: {
      padding: "20px",
      margin: "auto",
      width: 1010,
      height: 600,
      backgroundColor: "aliceblue",
    },
    detailbox: {
      margin: "20px",
      color: "#2E3586",
    },
  });
  //use react hooks to store the data without making a mess with an unnecessary class function
  let [responseData, setResponseData] = React.useState("");
  const fetchData = React.useCallback(() => {
    fetch("https://hapi.fhir.org/baseR4/Patient?_format=json")
      .then((response) => response.json())
      .then((data) => setResponseData(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  let patients = []; //declare array for our objects

  function parseString(theTerm, spacing) {
    let start = convertedToString.search(theTerm);
    let end = convertedToString.indexOf('"', start + spacing);
    if (start >= 0 && end >= 0) {
      return convertedToString.substring(start + spacing, end);
    } else {
      return "NULL";
    }
  }

  if (typeof responseData.entry != "undefined") {
    for (let i = 0; i < responseData.entry.length; i++) {
      var convertedToString = "";
      let idNum = i;
      let tempFirstName = "NULL";
      let tempLastName = tempFirstName;
      let tempGender = "NULL";
      let tempBirthDate = "NULL";
      let tempAddress = "NULL";
      let tempPhone = "NULL";

      if (responseData.entry[i].resource)
        convertedToString = JSON.stringify(responseData.entry[i].resource);

      idNum = parseString("id", 5);
      tempFirstName = parseString("given", 9);
      tempLastName = parseString("family", 9);
      tempGender = parseString("gender", 9);
      tempBirthDate = parseString("birthDate", 12);
      tempAddress = parseString("address", 19);
      tempPhone = parseString("phone", 16);

      patients.push({
        patientID: idNum,
        firstName: tempFirstName,
        lastName: tempLastName,
        birthGender: tempGender,
        birthDate: tempBirthDate,
        address: tempAddress,
        phoneNumber: tempPhone,
      });
    }
  }

  function showDetails(patientNumber) {
    const found = patients.find(
      (element) => element.patientID === patientNumber
    );

    setPatient(patientNumber);
    setFirstName(found.firstName);
    setLastName(found.lastName);
    setAddress(found.address);
    setBirthDate(found.birthDate);
    setBirthGender(found.birthGender);
    setPhoneNumber(found.phoneNumber);
  }

  const classes = useStyles();

  return (
    <div>
      <h3 className={classes.heading}>FHIR Exercise</h3>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          className={classes.table}
          size="small"
          aria-label="Patient Table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sex at Birth</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((row) => (
              <TableRow key={row.patientID}>
                <TableCell>
                  {" "}
                  {row.firstName} {row.lastName}{" "}
                </TableCell>
                <TableCell> {row.birthGender} </TableCell>
                <TableCell> {row.birthDate} </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    aria-label="Get Patient Details"
                    onClick={() => showDetails(row.patientID)}
                  >
                    Show More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {patient !== 0 && (
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <div style={{ alignItems: "start" }}>
                <Button
                  variant="outlined"
                  size="small"
                  aria-label="Hide Patient Details"
                  startIcon={<FaArrowLeft />}
                  onClick={() => setPatient(0)}
                >
                  Return
                </Button>
                <h4 className={classes.detailbox}>
                  {firstName} {lastName}
                </h4>
                <h5 className={classes.detailbox}>Patient Identification</h5>
                <h6 style={{ marginLeft: "20px" }}>
                  Sex at Birth: {birthGender}{" "}
                </h6>
                <h6 style={{ marginLeft: "20px" }}>
                  Date of Birth: {birthDate}{" "}
                </h6>
              </div>
              <h5
                style={{
                  marginTop: "-100px",
                  marginLeft: "600px",
                  color: "#2E3586",
                }}
              >
                Contact Information
              </h5>
              <h6 style={{ marginTop: "0px", marginLeft: "600px" }}>
                {" "}
                Address: {address}
              </h6>
              <h6 style={{ marginTop: "0px", marginLeft: "600px" }}>
                {" "}
                Phone Number: {phoneNumber}
              </h6>
            </Paper>
          </div>
        )}
      </TableContainer>
    </div>
  );
}
export default withRouter(Home);
