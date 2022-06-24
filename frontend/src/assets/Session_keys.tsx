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

export function setSessionId(id: number){
    localStorage.setItem("id", id.toString());
    };


export function getSessionId(): number{
    let teste = localStorage.getItem("id");
    if(teste==null){
        return -1
    } else {
        return parseInt(teste);
    }
}

export function clearSessionId() {
    localStorage.removeItem("id");
}


//1 para catador, 0 para usuário convencional
export function setSessionRole(role: number){
    localStorage.setItem("role", role.toString());
    };


export function getSessionRole(): number{
    let teste = localStorage.getItem("role");
    if(teste==null){
        return -1
    } else {
        return parseInt(teste);
    }
}

export function clearSessionRole() {
    localStorage.removeItem("role");
}