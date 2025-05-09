import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css"
import Main from "./components/Main.tsx";
import TeamDetail from "./pages/TeamDetail.tsx";
import MakeMatch from "./pages/MakeMatch.tsx";
import MatchDetail from "./pages/MatchDetail.tsx";
import ContentManager from "./pages/ContentManager.tsx";
import Layout from "./components/Layout.tsx";
import {DateProvider} from "./components/DateContext.tsx";
import TeamsPage from "./pages/MakePrediction..tsx";
import AllMatches from "./pages/AllMatches.tsx";
import Analytics from "./pages/Analytics.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "/", element: <Main/>},
            {path: "/teams", element: <TeamsPage/>},
            {path: "/teams/:teamId", element: <TeamDetail/>},
            {path: "/team/:teamId", element: <TeamDetail/>},
            {path: "/match", element: <MakeMatch/>},
            {path: "/match/:matchId", element: <MatchDetail/>},
            {path: "/analytics", element: <Analytics/>},
            {path: "/manager", element: <ContentManager/>},
            {path: "/manager/matches", element: <AllMatches/>},
        ],
    },
]);

function App() {
    return (
        <DateProvider>
            <RouterProvider router={router}/>
        </DateProvider>
    );
}

export default App;
