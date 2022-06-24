import { LocalUser } from "./Types";

export let SESSION_KEY : LocalUser = {
    token: "vazio"
}

export function setSessionKey(token: string){
    localStorage.setItem("token", token);
    };


export function getSessionKey(): string{
    let teste = localStorage.getItem("token");
    if(teste==null){
        return "vazio"
    } else {
        return teste;
    }
}

export function clearSessionKey() {
    localStorage.removeItem("token");
}

export function setSessionId(id: string){
    localStorage.setItem("id", id);
    };


export function getSessionId(): string{
    let teste = localStorage.getItem("id");
    if(teste==null){
        return "vazio"
    } else {
        return teste;
    }
}

export function clearSessionId() {
    localStorage.removeItem("id");
}