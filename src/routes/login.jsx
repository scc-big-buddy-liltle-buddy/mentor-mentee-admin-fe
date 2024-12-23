import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../api/auth";
import { authStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const isEmailError = email === "";
  const isPasswordError = password === "";

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = authStore((state) => state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Make await call to login API
    let response = await login(email, password);

    setIsLoading(false);
    // Check status code
    if (response.status !== 200) {
      alert("Login failed");
      return;
    }
    setUser(response);
    navigate("/dashboard");
  };

  return (
    <div style={{ position: "relative" }}>
      {isLoading && (
        <Flex
          style={{ position: "absolute", zIndex: 1000 }}
          height={"100vh"}
          backdropBlur={16}
          background={"rgba(255, 255, 255, 1)"}
          width={"100vw"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
        >
          <div class="spinner"></div>
          <Text>Logging in</Text>
        </Flex>
      )}
      <Flex justify={"center"} align={"center"} h={"100vh"}>
        <div className="">
          <Text fontWeight={"bold"} fontSize={"2xl"} mb={4}>
            <Center>
              <h1>Saigonchildren M2M Admin Login</h1>
            </Center>
          </Text>

          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              Login
            </Button>
          </form>
        </div>
      </Flex>
    </div>
  );
};

export default Login;
