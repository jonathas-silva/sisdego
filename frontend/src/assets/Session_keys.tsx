import { LocalUser } from "./Types";

export let SESSION_KEY : LocalUser = {
    token: "null"
}

export function setSessionKeys(token: string){
    localStorage.setItem("token", token);
    };


export function getSessionKeys(): string{
    let teste = localStorage.getItem("token");
    if(teste==null){
        return "vazio"
    } else {
        return teste;
    }
}

export function clearSessionKeys() {
    localStorage.removeItem("token");
}