import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout';
import Search from '../layout/Search';
import PlayList from '../pages/PlayList';
import Home from '../pages/Home';

const router = createBrowserRouter([
    {
        path:'/',
        element:(
            <Layout />
        ),
        children: [
            { path: '', element: <Home />},
            { path: 'search', element: <Search />},
            { path: 'playlist', element: <PlayList />}
        ]
    }
])

export default function Route() {
    return <RouterProvider router={router} />;
  }