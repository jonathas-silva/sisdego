import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "../assets/Keys";

export default function Login() {

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
            response => {
                console.log (response.data);
                console.log (response.data);
            }
        )

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