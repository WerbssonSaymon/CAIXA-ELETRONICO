import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home/home';
import CadastroUsuario from '../pages/cadastroUsuario/cadastroUsuario';
import Banco from '../pages/banco/banco';
import Usuario from '../pages/usuario/usuario';
import Error from '../pages/error/error'
import Jogo from '../pages/jogo/jogo'
import CadastroPergunta from '../pages/cadastroPergunta/cadastroPergunta'
import Pergunta from '../pages/pergunta/pergunta'


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
            path: '/cadastro-usuarios',
            element: <CadastroUsuario />
        },
        {
            path: '/jogo',
            element: <Jogo />
        },
        {
            path: '/perguntas',
            element: <Pergunta/>
        },
        {
            path: '/cadastro-perguntas',
            element: <CadastroPergunta />
        }
    ]);


    return (
        <RouterProvider router={routes} />
    )
}
