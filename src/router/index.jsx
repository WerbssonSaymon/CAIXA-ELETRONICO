import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home/home';
import Usuario from '../pages/usuario/usuario';
import Banco from '../pages/banco/banco';
import Gestao from '../pages/gestao/gestao';
import Error from '../pages/error/error'


export default function index() {

    const routes = createBrowserRouter([
        {
            path: '/',
            element: <Home />,
            errorElement: <Error/>
        },
        {
            path: '/usuarios',
            element: <Usuario />
        },
        {
            path: '/banco',
            element: <Banco />
        },
        {
            path: '/gestao',
            element: <Gestao />
        }
    ]);


    return (
        <RouterProvider router={routes} />
    )
}
