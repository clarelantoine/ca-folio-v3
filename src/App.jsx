import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Navigation from './components/navigation/navigation.component';
import Home from './routes/home/home.component';
import About from './routes/about/about.component';

const App = () => (
    <Routes>
        <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
        </Route>
    </Routes>
);

export default App;
