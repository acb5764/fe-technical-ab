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
      marginLeft: "18vw",
      backgroundColor: "aliceblue",
    },
    heading: {
      marginLeft: "40vw",
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
      width: "60vw",
    },
    paper: {
      padding: "20px",
      margin: "auto",
      width: "100%",
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

      if (responseData.entry[i].resource){
        convertedToString = JSON.stringify(responseData.entry[i].resource);

      idNum = parseString("id", 5);
      let tempFirstName = parseString("given", 9);
      let tempLastName = parseString("family", 9);
      let tempGender = parseString("gender", 9);
      let tempBirthDate = parseString("birthDate", 12);
      let tempAddress = `${parseString("line", 8)} ${parseString("city", 7)}, ${parseString("state", 8)} ${parseString("postalCode", 13)}`;
      let tempPhone = parseString("phone", 16);

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
          <TableHead aria-label="Table Heading">
            <TableRow aria-label="Table Heading Row">
              <TableCell>Name</TableCell>
              <TableCell>Sex at Birth</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell aria-label="Details Header" />
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((row) => (
              <TableRow
                key={row.patientID}
                aria-label={row.firstName + " " + row.lastName}
              >
                <TableCell aria-label="Patient Name">
                  {" "}
                  {row.firstName} {row.lastName}{" "}
                </TableCell>
                <TableCell aria-label="Birth Gender">
                  {" "}
                  {row.birthGender}{" "}
                </TableCell>
                <TableCell aria-label="Birth Date"> {row.birthDate} </TableCell>
                <TableCell aria-label="Get Patient Details">
                  <Button
                    variant="outlined"
                    size="small"
                    aria-label="Details Button"
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
            <Paper className={classes.paper} aria-label="Details Component">
              <div style={{ alignItems: "start" }} aria-label="Details">
                <Button
                  variant="outlined"
                  size="small"
                  aria-label="Hide Patient Details"
                  tabIndex="0"
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
                  marginLeft: "25vw",
                  color: "#2E3586",
                }}
              >
                Contact Information
              </h5>
              <h6 style={{ marginTop: "0px", marginLeft: "25vw" }}>
                {" "}
                Address: {address}
              </h6>
              <h6 style={{ marginTop: "0px", marginLeft: "25vw" }}>
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
