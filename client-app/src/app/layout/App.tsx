import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashbord from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleCloseForm() {
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity: Activity){
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
    : setActivities([...activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  return (
    // <>  shortcode fragment
    <>
      {/* <Header as="h2" icon="users" content="Reactivitis" /> */}
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashbord
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleCloseForm}
          createOrEdit = {handleCreateOrEditActivity}
        />
      </Container>
    </>
  );
}

export default App;
