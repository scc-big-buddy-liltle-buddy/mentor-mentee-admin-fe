import { Link, Outlet } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import { useMentorStore, useMenteeStore } from "../store/mem";
import React, { useEffect } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useMatchStore } from "../store/match";

export default function Root() {
  const {
    isLoading: isLoadingMentee,
    loadMentee,
    isError: isErrorLoadingMentee,
  } = useMenteeStore();

  const {
    isLoading: isLoadingMatch,
    loadMatchData,
    isError: isErrorLoadingMatch,
  } = useMatchStore();
  const {
    isLoading: isLoadingMentor,
    loadMentor,
    isError: isErrorLoadingMentor,
  } = useMentorStore();
  const [showLoading, setShowLoading] = React.useState(true);
  useEffect(() => {
    if (isLoadingMentee || isLoadingMentor || isLoadingMatch) {
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }, [isLoadingMentee, isLoadingMentor, isLoadingMatch]);

  const [showError, setShowError] = React.useState(false);
  useEffect(() => {
    if (isErrorLoadingMentee || isErrorLoadingMentor || isErrorLoadingMatch) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [isErrorLoadingMentee, isErrorLoadingMentor, isErrorLoadingMatch]);

  useEffect(() => {
    async function fetchData() {
      await loadMentee();
      await loadMentor();
      await loadMatchData();
    }
    fetchData();
  }, []);
  return (
    <>
      {showError ? (
        <Flex
          height={"100vh"}
          flexDirection={"column"}
          alignItems="center"
          gap={2}
          justifyContent="center"
        >
          <Text>
            Oops, Sorry!. We cannot connect to the server, please try again.{" "}
            {":("}
          </Text>
          <Button
            onClick={() => {
              // Reload page
              window.location.reload();
            }}
            color="scc_blue.100"
          >
            Reload
          </Button>
        </Flex>
      ) : showLoading ? (
        <Flex
          height={"100vh"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
        >
          <div class="spinner"></div>
          <Text>Almost ready. We are loading your SCC mentor-mente data.</Text>
        </Flex>
      ) : (
        /* From Uiverse.io by satyamchaudharydev */

        <Sidebar content={<Outlet />} />
      )}
    </>
  );
}
