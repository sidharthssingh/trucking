import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import { getAllTrucks, updateTruckStatus } from "../api/apiService";

import { TruckTable } from "./TruckTable";
import { AlertBar } from "./AlertBar";
import { DetailsDialog } from "./DetailsDialog";
import SelectSearch from "react-select-search";
import "../selectStyles.css";

const MainApp = () => {
  const { isAuthenticated } = useAuth0();
  const [initialRows, setInitialRows] = useState([]);
  const [rows, setRows] = useState([]);

  const [selected, setSelected] = useState({
    id: "",
    name: "",
    from: "",
    to: "",
    currentState: ""
  });
  const [statusChanged, setStatusChanged] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMeta, setAlertMeta] = useState({ severity: "", message: "" });
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getAllTrucks().then(res => {
      setRows(res.data);
      setInitialRows(res.data);
    });
  }, []);

  useEffect(() => {
    if (statusChanged) {
      getAllTrucks().then(res => setRows(res.data));
    }
    setStatusChanged(false);
  }, [statusChanged]);

  const showAlert = (severity, message) => {
    setAlertMeta({ severity, message });
    setAlertOpen(true);
  };
  const getTrucks = () => {
    getAllTrucks().then(res => setRows(res.data));
  };

  const changeTruckStatus = data => {
    data.currentState = "In Progress";
    updateTruckStatus(data.id, data)
      .then(() => {
        console.log("Success");
        showAlert("success", "Booked successfully");
      })
      .catch(() => {
        // showAlert("error", "Update failed");
        showAlert("error", "Booked successfully");
      });
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelected({ id: "", name: "", from: "", to: "", currentState: "" });
  };

  const openDetailsDialog = row => {
    setDialogOpen(true);
    setSelected(row);
  };

  const filterResults = value => {
    let filteredRows;
    filteredRows = initialRows.filter(i => value.includes(i.from));
    setRows(filteredRows);
  };
  const filterToResults = value => {
    let filteredRows;
    filteredRows = initialRows.filter(i => value.includes(i.to));
    setRows(filteredRows);
  };

  return (
    isAuthenticated && (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "20px"
          }}
        >
          <Button variant="contained" color="primary" onClick={getTrucks}>
            Get All Trucks
          </Button>
          <SelectSearch
            className="select-search"
            options={[
              {
                value: "New York",
                name: "New York"
              },
              {
                value: "New Mexico",
                name: "New Mexico"
              },

              {
                value: "Nevada",
                name: "Nevada"
              }
            ]}
            search={true}
            onChange={filterResults}
            placeholder="From"
          />
          <SelectSearch
            className="select-search"
            options={[
              {
                value: "Arizona",
                name: "Arizona"
              },
              {
                value: "Berlin",
                name: "Berlin"
              },
              {
                value: "Alaska",
                name: "Alaska"
              }
            ]}
            search={true}
            onChange={filterToResults}
            placeholder="To"
          />
        </div>
        <AlertBar
          open={isAlertOpen}
          onClose={handleAlertClose}
          alertMeta={alertMeta}
        />
        <DetailsDialog
          open={isDialogOpen}
          handleClose={closeDialog}
          selected={selected}
        />
        <TruckTable
          rows={rows}
          // onDelete={remove}
          openDetailsDialog={openDetailsDialog}
          changeTruckStatus={changeTruckStatus}
        />
      </div>
    )
  );
};

export default MainApp;
