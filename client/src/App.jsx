import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import FavouritePage from "./scenes/favouritePage";
import MissingPage from "./scenes/missingPage";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import { NoteProvider } from "./context/NoteContext";
import ArchivePage from "./scenes/archivePage";
import TrashPage from "./scenes/trashPage";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const isAuth = Boolean(useSelector((state) => state.token));

  const [showPopup, setShowPopup] = useState(false);

  const handleTogglePopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NoteProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/home"
                  element={isAuth ? <HomePage showPopup={showPopup} handleTogglePopup={handleTogglePopup} /> : <Navigate to="/" />}
                />
                <Route
                  path="/favourites"
                  element={isAuth ? <FavouritePage showPopup={showPopup} handleTogglePopup={handleTogglePopup}/> : <Navigate to="/" />}
                />
                <Route
                  path="/archive"
                  element={isAuth ? <ArchivePage showPopup={showPopup} handleTogglePopup={handleTogglePopup}/> : <Navigate to="/" />}
                />
                <Route
                  path="/trashbin"
                  element={isAuth ? <TrashPage showPopup={showPopup} handleTogglePopup={handleTogglePopup}/> : <Navigate to="/" />}
                />
                <Route path="*" element={<MissingPage />} />
              </Routes>
            </NoteProvider>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
