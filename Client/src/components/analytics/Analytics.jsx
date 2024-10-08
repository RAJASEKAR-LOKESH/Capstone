import React, { useState, useEffect, useContext } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  Card,
  Box,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Typography,
  Container,
  Button,
} from "@mui/material";

import http from "../../utils/http";

import Revenue from "./Revenue";
import UserAccounts from "./UserAccounts";
import PaymentDetails from "./PaymentDetails";

function Analytics() {
  const [pendingCount, setPendingCount] = useState("");
  const [approvedCount, setApprovedCount] = useState("");
  useEffect(() => {
    http.get("/event/pending").then((res) => {
      console.log(res.data, "POSTS FROM API");
      setPendingCount(res.data);
    });
    http.get("/event/all").then((res) => {
      console.log(res.data, "POSTS FROM API");
      setApprovedCount(res.data);
    });
  }, []);
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          mt: 0,
          pt: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          height: "auto",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "center",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
          }}
        >
          <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
            APPROVAL STATUS
          </Typography>
          <PieChart
            style={{ marginTop: "20px", marginBottom: "20px" }}
            series={[
              {
                data: [
                  { id: 0, value: approvedCount.length, label: "APPROVED" },
                  { id: 1, value: pendingCount.length, label: "PENDING" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
          <Typography style={{ marginTop: "5px", marginBottom: "5px" }}>
            Approved Events: {approvedCount.length}
          </Typography>
          <Typography>Pending Events: {pendingCount.length}</Typography>
        </Card>
        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "center",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
          }}
        >
          <CardContent>
          <Typography style={{ fontWeight: "bold", fontSize: "20px" }}>
            REVENUE
          </Typography>
          <Revenue></Revenue>
          </CardContent>
        </Card>

        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "center",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
            height:'400px',
            overflow:'scroll'
          }}
        >
          <UserAccounts>
          </UserAccounts>
        </Card>
        <Card
          sx={{
            mt: 0,
            bgcolor: "#fof8ff",
            width: "30%",
            padding: "10px",
            textAlign: "center",
            flex: "1 1 300px",
            minWidth: "380px",
            maxWidth: "30%",
            height:'400px',
            overflow:'scroll'
          }}
        >
         <PaymentDetails></PaymentDetails>
        </Card>
      </Container>
    </>
  );
}

export default Analytics;
