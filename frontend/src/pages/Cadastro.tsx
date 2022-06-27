import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../assets/Keys";




export function Cadastro() {

    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        const nome = (event.target as any).nome.value;
        const email:string = (event.target as any).email.value;
        const senha = (event.target as any).senha.value;
        const confirmSenha = (event.target as any).confirmSenha.value;
        const id_catador = -1; //serão permitidos novos cadastros apenas para usuários, não catadores


        if(nome=="" || email=="" || senha==""){
            alert("Todos os campos são obrigatórios!");
            setLoading(false);
        }else if(senha!=confirmSenha){
            alert("senhas e confirmação de senha são diferentes!");
            setLoading(false);   
        } else{

        const config: AxiosRequestConfig = {
            baseURL: BASE_URL,
            method: 'POST',
            url: '/usuarios',
            data:{
                nome: nome,
                email: email.toLowerCase(),
                senha: senha,
                idCatador: id_catador
            }
        }
        axios(config).then(
            response => {
                if(response.status == 200){
                    alert("Usuário cadastrado com sucesso! Faça login para continuar");
                    nav("/");
                }
            }
        ).catch(
            function (error) {
                alert("Houve um erro no cadastro. Verifique seu email (deve ser único) e tente novamente!");
                setLoading(false);
            }
        )
        }
    }

    return (
        <Container className="d-flex container">
            <div className="container-sm inicio-principal mt-4">
        <form className="m-1 mb-2" onSubmit={handleSubmit}>
            <label htmlFor="nome" className="form-label"> Nome</label>
            <input type="text" className="form-control" id="nome" />
            <label htmlFor="email" className="form-label" > Email</label>
            <input type="text" className="form-control" id="email"/>
            <label htmlFor="senha" className="form-label" > Senha</label>
            <input type="password" className="form-control" id="senha"/>
            <label htmlFor="confirm_senha" className="form-label" > Confirme a senha</label>
            <input type="password" className="form-control" id="confirmSenha"/>
            
            <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="mt-3 col-12">
                    {loading ? 'Carregando...' : 'Cadastrar'}
                </Button>
            
        </form>

       </div>
        </Container>

    )
}