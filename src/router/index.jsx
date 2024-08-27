import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home/home';
import Usuario from '../pages/usuario/usuario';
import Banco from '../pages/banco/banco';


export default function index() {

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/usuarios',
            element: <Usuario />
        },
        {
            path: '/banco',
            element: <Banco />
        }
    ]);


    return (
        <RouterProvider router={routes} />
    )
}
