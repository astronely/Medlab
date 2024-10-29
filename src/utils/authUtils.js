import axios from "axios";

export const isAuth = async (serverAddress) => {
    let result = false;
    await axios.get(`${serverAddress}/api/admin/isAuth`)
        .then(res => {
            console.log("RES STATUS: ", res.status)
            if (res.status === 200) {
                result = true;
            }
        })
        .catch(err => {
            console.log(err)
        })
    return result
}