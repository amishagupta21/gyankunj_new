import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreateAdmission from "./CreateAdmission";
import {
  deleteUserInfo,
  fetchFeesStructuresList,
  fetchMetadataInfo,
  getUsersList,
} from "../../../ApiClient";
import AlertDialogSlide from "../HRMS/AlertDialogSlide";
import { showAlertMessage } from "../../AlertMessage";
import UserCard from "./UserCard";

const AdmissionView = () => {
  const [isAddUserModalVisible, setIsAddUserModalVisible] =
    useState(false);
  const [refreshView, setRefreshView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
  const [showAlert, setShowAlert] = useState("");
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [metadataList, setMetadataList] = useState({});
  const [feesStructuresList, setFeesStructuresList] = useState([]);
  const designationsList = JSON.parse(localStorage.getItem("UserRoles") || "[]");
  const role_id = designationsList.find((item) => item.role_name === "Student")?.role_id || null;

  const navigate = useNavigate();

  const fetchAndSetFeesStructures = useCallback(async () => {
    try {
      const response = await fetchFeesStructuresList();
      setFeesStructuresList(response?.data?.fees_structure_info || []);
    } catch (err) {
      console.error("Failed to fetch fees structures:", err);
    }
  }, []);

  const fetchMetadataList = useCallback(async () => {
    const payload = {
      "fetch_all_categories": {},
      "fetch_all_languages": {},
      "fetch_all_nationalities": {},
      "fetch_all_genders": {},
      "get_all_grade_details": {}
    }
    try {
      const res = await fetchMetadataInfo(payload);
      const metadata = res?.data?.metadata_info || {};

      // Extract data safely with fallback values
      const {
        fetch_all_categories = {},
        fetch_all_languages = {},
        fetch_all_nationalities = {},
        fetch_all_genders = {},
        get_all_grade_details = {}
      } = metadata;

      const formattedData = {
        categories: fetch_all_categories.category_data?.map(({ category_id, category_value }) => ({
          id: category_id,
          name: category_value
        })) ?? [],

        languages: fetch_all_languages.language_data?.map(({ language_id, language_value }) => ({
          id: language_id,
          name: language_value
        })) ?? [],

        nationalities: fetch_all_nationalities.nationality_data?.map(({ nationality_id, nationality_value }) => ({
          id: nationality_id,
          name: nationality_value
        })) ?? [],

        genders: fetch_all_genders.gender_data?.map(({ gender_id, gender_value }) => ({
          id: gender_id,
          name: gender_value
        })) ?? [],

        grades: get_all_grade_details.grade_details?.grade_details?.map(({ grade_id, grade }) => ({
          id: grade_id,
          name: grade
        })) ?? []
      };

      setMetadataList(formattedData);
    } catch (error) {
      console.error("Failed to fetch metadata list:", error);
    }
  }, []); // Ensures the function updates if `fetchMetadataInfo` changes


  useEffect(() => {
    // Fetch both lists in parallel
    Promise.all([fetchAndSetFeesStructures(), fetchMetadataList()]).catch(console.error);
  }, [fetchAndSetFeesStructures, fetchMetadataList]);

  // Fetching user list with async/await for better readability
  useEffect(() => {
    const fetchUsersList = async () => {
      setIsLoading(true);
      try {
        const res = await getUsersList({
          "user_ids": [],
          "role_id": role_id
        });
        const usersList = res?.data?.user_data || [];
        setUsersList(usersList);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsersList();
  }, [refreshView]);

  // Handling action with useCallback to prevent unnecessary re-renders
  const handleAction = useCallback((data, action) => {
    switch (action) {
      case "edit":
        setSelectedUserDetails(data);
        setIsAddUserModalVisible(true);
        break; // Using break instead of return for clarity

      case "delete":
        setSelectedUserDetails(data);
        setIsOpenConfirmDialog(true);
        break; // Using break instead of return for clarity

      default:
        goToProfile(data);
    }
  }, []);

  const handleClose = (isSubmit) => {
    setIsAddUserModalVisible(false);
    setSelectedUserDetails(null);
    if (isSubmit) {
      // Debounce the refresh to avoid excessive rerenders
      setTimeout(() => setRefreshView((prev) => !prev), 500);
    }
  };

  // Confirmation dialog
  const closeDialog = (isConfirmed) => {
    if (isConfirmed) {
      getDeleteUser();
    } else {
      setIsOpenConfirmDialog(false);
    }
  };

  const getDeleteUser = () => {
    deleteUserInfo(selectedUserDetails.user_id)
      .then((res) => {
        setShowAlert(res?.data?.status === "success" ? "success" : "error");
        setTimeout(() => {
          setIsOpenConfirmDialog(false);
          setTimeout(() => {
            setRefreshView((prev) => !prev);
            setShowAlert("");
          }, 2000);
        }, 1000);
      })
      .catch(() => {
        setShowAlert("error");
        setTimeout(() => setShowAlert(""), 3000);
        setIsOpenConfirmDialog(false);
      });
  };

  const goToProfile = (userData) => {
    navigate(`/profile/${encodeURIComponent(userData.user_id)}/${encodeURIComponent(4)}`);
  };

  return (
    <>
      <Grid container justifyContent="end" alignItems="center">
        <Button
          className="rounded-pill"
          variant="contained"
          onClick={() => handleAction({}, "edit")}
          color="warning"
        >
          + New Admission
        </Button>
      </Grid>
      <Grid container spacing={3} mt={1}>
        {isLoading ? (
          <Box className="d-flex justify-content-center align-items-center w-100 mt-5">
            <CircularProgress />
          </Box>
        ) : usersList && usersList.length > 0 ? (
          usersList.map((user) => (
            <UserCard
              key={user.user_id}
              userDetails={user}
              onAction={handleAction}
            />
          ))
        ) : (
          <Box className="d-flex w-100 justify-content-around mt-5 text-center text-danger">
            No data available
          </Box>
        )}
      </Grid>
      {isAddUserModalVisible && (
        <CreateAdmission
          isOpen={isAddUserModalVisible}
          handleClose={handleClose}
          selectedData={selectedUserDetails}
          metadataList={metadataList}
          feesStructuresList={feesStructuresList}
          role_id={role_id}
        />
      )}

      {/* Confirmation Dialog */}
      <AlertDialogSlide
        isOpen={isOpenConfirmDialog}
        title={"Are You Sure?"}
        content={
          "This will permanently delete the user's information from our records. Click 'Agree' to confirm."
        }
        onAgree={() => {
          closeDialog(true);
        }}
        onDisagree={() => {
          closeDialog();
        }}
      />

      {showAlert &&
        showAlertMessage({
          open: true,
          alertFor: showAlert,
          message: `The user deletion ${showAlert === "success" ? "succeeded" : "failed"
            }.`,
        })}
    </>
  );
};

export default AdmissionView;
