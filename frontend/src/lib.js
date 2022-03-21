export const url = "http://localhost:3000/api/v1"
export const headersFN = (body, mothod, token = null) => {
    let headers = null
    if (token) {
        headers = {
            "Content-Type": "application/json",
            Authentication: `Bearer Token ${token}`,
        }
    } 
    headers = {
        "Content-Type": "application/json"
    }
    return {
        method: mothod,
        headers,
        body: JSON.stringify(body)
    }    
}