import { Card, CardBody, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { useMatches, useNavigate, useParams } from "react-router-dom";
import MentorCard from "./Card/MentorDetail";
import { getMentorByUID } from "../api/match";
import { FiChevronLeft } from "react-icons/fi";
import { useMatchStore } from "../store/match";
import Loading from "./Loading";
import MenteeList from "./Card/MenteeList";
const GroupDetail = () => {
  const navigate = useNavigate();
  // Get matchId and groupId from URL by using use
  const { matchId, groupId } = useParams();
  const [groupData, setGroupData] = React.useState(null);
  const { getGroupByMatchAndGroupId } = useMatchStore();
  React.useEffect(() => {
    // fetch mentor data
    let newGroupData = getGroupByMatchAndGroupId(matchId, groupId);
    setGroupData(newGroupData);
  }, []);

  return (
    <>
      {groupData ? (
        <Grid
          p={4}
          h="80vh"
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            colSpan={2}
          >
            <MentorCard mentor={groupData.mentor} />
          </GridItem>
          <GridItem colSpan={3} h="80vh" overflow={"auto"}>
            <Card>
              <CardBody>
                <MenteeList mentees={groupData.mentees} />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default GroupDetail;
