import axios, { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { set } from "react-hook-form";
import { BASE_URL } from "../assets/Keys";
import { getSessionId, getSessionKey, SESSION_KEY, setSessionId, setSessionKey } from "../assets/Session_keys";
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const nav = useNavigate();

    //verifica se há um token no localStorage e tenta fazer um refresh. Se der certo, redireciona para a página 'Histórico'
    useEffect(
        () => {
            const usuario_logado = getSessionKey();
            console.log(usuario_logado);
            if(usuario_logado != "vazio"){
            
            
                const config: AxiosRequestConfig = {
                    baseURL: BASE_URL,
                    method: 'POST',
                    url: "/auth/refresh_token",
                    headers: {
                        'Authorization': `Bearer ${usuario_logado}`
                    }
                }
                axios(config).then(
                    response => {
                        if(response.status == 200){
                            setSessionKey(response.data);
                            nav("/historico");
                        }
                    }
                ).catch(function(error){
                    alert("Sessão expirada! Faça login novamente para entrar!");
                    /* Só chegaremos nessa parte SE houver um token armazenado E ele estiver expirado
                    Caso contrário, o sistema não tentará fazer um refresh_token.*/
                })
            }
        }, []
    );



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const email = (event.target as any).email.value;
        const senha = (event.target as any).senha.value;

        console.log(email);
        console.log(senha);

        //limpando os forms
        //É A MELHOR MANEIRA? Pesquisar sobre!
        //(event.target as any).email.value = "";
        //(event.target as any).senha.value = "";


        //Obtendo o token
        const config: AxiosRequestConfig = {
            baseURL: `${BASE_URL}`,
            method: 'POST',
            url: '/login',
            data: {
                email: email,
                senha: senha
            }
        }

        axios(config).then(
            response => { //se der certo a requisição:
                console.log (response.data);
                console.log (response.status);
                setSessionKey(response.data);

            
        axios.get(`${BASE_URL}/usuarios/getEmail`, {
            
            params: {
                email: email
            }
            ,headers: {
                'Authorization': `Bearer ${response.data}`
            }
        }).then(
            resposta => {
                console.log(resposta.data);
                setSessionId(resposta.data);
            }
        )        



            }   
        ).catch(function (error){
            if(error.response.status == 403){
                alert("Login ou senha incorretos!");
            }
        })  

    }
    
    return(
       <div className="d-flex container">
        <form className="m-1 mb-2" onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label"> Email</label>
            <input type="text" className="form-control" id="email" />
            <label htmlFor="senha" className="form-label" > Senha</label>
            <input type="text" className="form-control" id="senha"/>
            
            <button className="btn btn-primary mt-2 col-12">Entrar</button>
            
        </form>
       </div>
    )
}