import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home/home';
import Usuario from '../pages/usuario/usuario';
import Banco from '../pages/banco/banco';
import Gestao from '../pages/gestao/gestao';
import Error from '../pages/error/error'
import Jogo from '../pages/jogo/jogo'
import Perguntas from '../pages/perguntas/perguntas'
import AdminPergunta from '../pages/adminPergunta/adminPergunta'


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
        },
        {
            path: '/jogo',
            element: <Jogo />
        },
        {
            path: '/perguntas',
            element: <Perguntas />
        },
        {
            path: '/ad-perguntas',
            element: <AdminPergunta/>
        }
    ]);


    return (
        <RouterProvider router={routes} />
    )
}
