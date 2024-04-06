import './App.css';

import LoginRegister from './views/LoginRegister';
import UserContext from './context/UserContext';
import { useState } from 'react';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovie';
import WriteReview from './components/WriteReview';
import MoviesReview from './components/MoviesReview';
import NotFoundPage from './components/NotFoundPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const userDetails = JSON.parse(localStorage.getItem("user"));
    const userInfo = userDetails ? userDetails : null;
    const [user, setUser] = useState(userInfo)

    const setUserKeyValue = (clave, valor) => {
        setUser({ ...user, [clave]: valor })
    }

    const objetoContexto = {
        user,
        setUser,
        setUserKeyValue
    }


    return (
        <UserContext.Provider value={objetoContexto}>
            <Router>
                <Routes>
                    <Route path="/" element={<PublicRoute redirectPath="/"><LoginRegister /></PublicRoute>} />
                    <Route path="/movies" element={<PrivateRoute><MovieList /></PrivateRoute>} />
                    <Route path="/movies/new" element={<PrivateRoute><CreateMovie /></PrivateRoute>} />
                    <Route path="/movies/:id/review" element={<PrivateRoute><WriteReview /></PrivateRoute>} />
                    <Route path="/movies/:id" element={<PrivateRoute><MoviesReview /></PrivateRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    );
}

export default App