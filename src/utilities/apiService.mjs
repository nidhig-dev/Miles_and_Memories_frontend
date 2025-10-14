import axios from "axios";

let baseURL = "http://localhost:3000/api";
//http://localhost:3000/api/user/profile

async function getUser(token) {

    let res = await axios.get(`${baseURL}/user/profile`, {
        headers: { "x-auth-token": token },
    });

    return res.data;
}

export default { getUser };
