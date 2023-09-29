import { createBrowserRouter } from "react-router-dom";
import Header from "../components/UI/Header";
import Home from "../components/Home/Home";
import Error from "../components/UI/Error";
import About from "../components/Pages/About";
import PrivacyPolicy from "../components/Pages/PrivacyPolicy";
import Profile, {
  loader as profileLoader,
} from "../components/Profile/Profile";
import Terms from "../components/Pages/Terms";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "profile/:username",
        element: <Profile />,
        loader: profileLoader,
      },
      { path: "/terms", element: <Terms /> },
      { path: "/privacypolicy", element: <PrivacyPolicy /> },

      { path: "/about", element: <About /> },
    ],
  },
]);
