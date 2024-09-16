import { Flex, Link, Text } from "@chakra-ui/react";
import React from "react";

const TextLimiter = ({ text, limit }) => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div>
      {showMore ? (
        <>
          <Text>{text}</Text>
          <Link
            color={"scc_blue.100"}
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            Read less
          </Link>
        </>
      ) : text.length > limit ? (
        <>
          <Text>
            {text.slice(0, limit)} ...{" "}
            <Link
              color={"scc_blue.100"}
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              Read more
            </Link>
          </Text>
        </>
      ) : (
        text
      )}
    </div>
  );
};

export default TextLimiter;
