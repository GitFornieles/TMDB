import List from "./List";
import SideBar from "./SideBar";
import Grid from "./Grid";
import DetailedView from "./DetailedView";
import NavBar from "./NavBar";
import Footer from "./Footer";
import NewUserForm from "./NewUserForm";
import LogInForm from "./LogInForm";
import { Routes, Route } from "react-router-dom";
import RegisteredUser from "./RegisteredUser";
import Home from "./Home";
import OtherUsers from "./OtherUsers";
import OthersList from "./OthersList";
import NoResults from "./NoResults"

const App = () => {
  return (
    <>
      <NavBar />
      <div className="claseUnica">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/*" element={<DetailedView />} />
          <Route path="/movies" element={<Grid />} />
          <Route path="/tv/*" element={<DetailedView />} />
          <Route path="/shows" element={<Grid />} />
          <Route path="/search" element={<Grid />} />
          <Route path="tuki/favorites" element={<List />} />
          <Route path="tuki/watched" element={<List />} />
          <Route path="tuki/others" element={<OtherUsers />} />
          <Route path="tuki/others/favorites/*" element={<OthersList />} />
          <Route path="users/new/*" element={<NewUserForm />} />
          <Route path="/login/" element={<LogInForm />} />
          <Route path="/tuki/" element={<RegisteredUser />} />
          <Route path="/NotFound" element={<NoResults />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
