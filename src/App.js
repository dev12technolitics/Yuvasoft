import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginForm from "./pages/login/LoginForm";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import AccordionOne from "./pages/components/accordionOne";
import User from "./pages/user";

import { postLogoutUser } from "../src/redux/slices/loginRegister";
import LoginForm from "./pages/login/LoginForm";
import RegistrationForm from "./pages/login/RegistrationForm";
import CreateUser from "./pages/user/CreateUser";
import EditUser from "./pages/user/EditUser";

const drawerWidth = 200;

function App(props) {
  const { window } = props;

  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState("");
  const [userExist, setUserExist] = React.useState(true);

  const { loginUser, userAccessToken } = useSelector(
    (state) => state.loginRegister
  );

  React.useEffect(() => {
    if (userAccessToken != null) {
      if (loginUser?.name != undefined || loginUser?.name != "") {
        if (loginUser?.name?.includes(" ")) {
          let newArray = loginUser?.name?.split(" ");
          setUserName(newArray[0]);
        } else {
          setUserName(loginUser?.name);
        }
      }
    }
  }, [loginUser]);

  // const handleNavigate = () => {
  //   navigate("/login");
  // };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <List>
          <ListItem disablePadding>
            <AccordionOne />
          </ListItem>
        </List>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {userAccessToken ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              zIndex: 9999,
            }}
          >
            <Toolbar>
              <div className="flex w-full justify-end px-12 py-2">
                {userAccessToken == null ? (
                  <div>profile</div>
                ) : (
                  <div className="flex">
                    <div className="flex items-center tracking-wide capitalize font-normal theme_text">
                      <span style={{ color: "black" }}>
                        {userName}&nbsp;&nbsp;
                      </span>
                    </div>

                    {/* <Link href="/login"> */}
                    <div
                      onClick={() => {
                        dispatch(postLogoutUser());
                      }}
                      className="text-base font-normal capitalize tracking-wider flex items-center hover_theme_text hover:cursor-pointer"
                    >
                      Logout
                    </div>
                    {/* </Link> */}
                  </div>
                )}
              </div>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
            className="bg-[#fbfcfc]"
          >
            <Toolbar />
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<User />} />
                <Route exact path="/createuser" element={<CreateUser />} />
                <Route exact path="/user/:id" element={<EditUser />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </Box>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/signup" element={<RegistrationForm />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

App.propTypes = {
  window: PropTypes.func,
};

export default App;
