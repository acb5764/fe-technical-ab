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
  const [address, setAddress] = useState(0); //There is probably a better way to do this..
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

  if (typeof responseData.entry != "undefined") {
    for (let i = 0; i < responseData.entry.length; i++) {
      //This conditional block allows us to test for the most basic requirements to meet the data requirements of the tables.
      //The data from this source is often missing entire categories of data, in which case I do not want to render.
      //It is possible to stringify the data and render even if missing some fields, but I don't think thats necessary here. Its just a random feed.

      if (
        responseData.entry[i].resource &&
        responseData.entry[i].resource.id &&
        responseData.entry[i].resource.gender &&
        responseData.entry[i].resource.birthDate &&
        responseData.entry[i].resource.name &&
        responseData.entry[i].resource.address &&
        responseData.entry[i].resource.telecom &&
        responseData.entry[i].resource.telecom[0].value &&
        responseData.entry[i].resource.name[0].given &&
        responseData.entry[i].resource.name[0].family
      )
        patients.push({
          patientID: responseData.entry[i].resource.id,
          firstName: responseData.entry[i].resource.name[0].given[0],
          lastName: responseData.entry[i].resource.name[0].family,
          birthGender: responseData.entry[i].resource.gender,
          birthDate: responseData.entry[i].resource.birthDate,
          address:
            responseData.entry[i].resource.address[0].line[0] +
            " " +
            responseData.entry[i].resource.address[0].city +
            ", " +
            responseData.entry[i].resource.address[0].state +
            " " +
            responseData.entry[i].resource.address[0].country,
          phoneNumber: responseData.entry[i].resource.telecom[0].value,
        });
    }
  }
  //conditionals to make sure we actually recieved an object of quality (few and far between)

  if (patients.length < 20 && responseData.entry) {
    for (let i = 0; i < 20; i++)
      patients.push({
        patientID: i + "00",
        firstName: "Never ",
        lastName: "Gonna",
        birthGender: "Give you Up",
        birthDate: "Or let you down",
        address: "10 Broad Street New York NY U.S.A.",
        phoneNumber: "111.111.1111",
      });
  }
  function showDetails(patientNumber) {
    const found = patients.find((element) => (element) =>
      element === patientNumber
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
