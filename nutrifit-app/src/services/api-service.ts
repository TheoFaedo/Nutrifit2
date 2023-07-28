const apiDomain = "http://localhost:8080";


export const connect = (username: string, password: string): Promise<any> => {
    return fetch(`${apiDomain}/connect?pseudo=${username}&password=${password}`).then(response => {
        return response.json();
    }).catch(error => {
        return {error: "Connection problem"};
    });
}