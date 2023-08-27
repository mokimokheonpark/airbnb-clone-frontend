import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import GitHubLogInConfirmed from "./routes/GitHubLogInConfirmed";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import RoomDetail from "./routes/RoomDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "rooms/:roomPk",
        element: <RoomDetail />,
      },
      {
        path: "social",
        children: [
          {
            path: "github",
            element: <GitHubLogInConfirmed />,
          },
        ],
      },
    ],
  },
]);

export default router;
