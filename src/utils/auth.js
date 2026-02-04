export function getAuth() {
    const a = localStorage.getItem('auth');
    return a ? JSON.parse(a) : undefined;
}

export function setAuth(auth) {
    localStorage.setItem('auth', typeof auth === "string" ? auth : JSON.stringify(auth));
}

