export const requestConfirmEmail = async(data)=>{
    const res = await fetch("/api/confirm-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })
    return res.status
}

export const requestRegister = async(data) => {
    const res = await fetch("/api/create-account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    })
    return res.status
}

export const requestLogin = async(data) => {
    //console.log(data)
    const res = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    console.log(res.status)
    return res.status
}

export const requestAuthUser = async() => {
    const res = await fetch("/api/auth");
    if (res.status === 200) {
        const json = await res.json()
        return json
    }
    return null
}

export const requestAuthStatus = async() => {
    const res = await fetch("/api/auth");
    return res.status
}

export const requestLogout = async()=> {
    const res = await fetch("/api/logout")
    return res.status;
}

export const requestResetLink = async(data) => {
    const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return res.status
}

export const requestResetPassword = async(data) => {
    const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return res.status
}

export const requestGoogleAuth = async() => {
    const res = await fetch('/api/auth/google', {
        method: 'GET',
        credentials: 'include',
      })
    return res.status
}

export const requestTRM = async() => {
    const res = await fetch('/api/trm')
    const json = await res.json()
    return json;
}

export const requestCreateDepositRequest = async(data) => {
    const res = await fetch("/api/create-deposit-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.status
}

export const requestReadFunds = async() => {
    const res = await fetch("/api/funds")
    const json = await res.json()
    return json
}