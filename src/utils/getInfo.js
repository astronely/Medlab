import axios from "axios";

const serverAddress = `${import.meta.env.VITE_PROTOCOL}://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`

export const getLinks = async (links, setLinks, theme, assetsFolder, city = undefined) => {
    setLinks([]);
    const url = city === undefined ? `${serverAddress}/api/${theme}/get` : `${serverAddress}/api/${theme}/get/${city}`
    axios.get(url)
        .then(res => {
            console.log(res.data)
            for (let link of res.data) {
                setLinks(links => [...links,
                    {
                        name: link.file_name,
                        link: `${assetsFolder}/${link.file_name}`
                    }
                ])
            }
        })
        .catch(err => console.log(err))
}

export const getOnlyLinksName = async (theme, city = "") => {
    const url = city === "" ? `${serverAddress}/api/${theme}/get` : `${serverAddress}/api/${theme}/get/${city}`
    let resToSend = [];
    await axios.get(url)
        .then(res => {
            for (let file of res.data) {
                resToSend.push({name: file.file_name});
            }
            // console.log(`DATA for ADMIN for ${theme}: `, resToSend)
            return resToSend;
        })
        .catch(err => console.log(err))
    return resToSend;
}

export const getInfo = async (setInfo, theme, city = "") => {
    const url = city === "" ? `${serverAddress}/api/${theme}/get` : `${serverAddress}/api/${theme}/get/${city}`
    await axios.get(url)
        .then(res => {
            setInfo(res.data)
        })
        .catch(err => console.log(err))
}

export const getOnlyInfo = async (theme, city = "") => {
    const url = city === "" ? `${serverAddress}/api/${theme}/get` : `${serverAddress}/api/${theme}/get/${city}`
    let resToSend = [];
    await axios.get(url)
        .then(res => {
            resToSend = res.data;
            return resToSend;
        })
        .catch(err => console.log(err))
    return resToSend;
}

export const getCityInfo = async (city) => {

    let resToSend = [];
    await axios.get(`${serverAddress}/api/city/get/${city}`)
        .then(res => {
            resToSend = res.data;
            return resToSend;
        })
        .catch(err => console.log(err))
    return resToSend;
}

export const getCities = async () => {
    let resToSend = [];
    await axios.get(`${serverAddress}/api/city/getAll`)
        .then(res => {
            resToSend = res.data;
            return resToSend;
        })
        .catch(err => console.log(err))
    return resToSend;
}

export const getAddress = async (setAddress, city) => {
    await axios.get(`${serverAddress}/api/city/get/${city}`)
        .then(res => {
            // console.log(res)
            setAddress(res.data[0].address)
        })
        .catch(err => console.log(err))
}

export const getSpecialistsInfo = async (city) => {
    let resToSend = [];
    await axios.get(`${serverAddress}/api/specialist/get/${city}`)
        .then(res => {
            resToSend = res.data;
            return resToSend;
        })
        .catch(err => console.log(err))
    return resToSend;
}


export const getSpecialistsCards = async (specialists, setSpecialists, city) => {
    let resToSend = [];
    setSpecialists([]);
    await axios.get(`${serverAddress}/api/specialist/get/${city}`)
        .then(res => {
            for (let specialist of res.data) {
                const photoPath = specialist.photo === "man-placeholder.svg" ?
                    `${serverAddress}/assets/${specialist.photo}`
                    : `${serverAddress}/assets/${city}/specialist/${specialist.photo}`;

                setSpecialists(specialists => [...specialists, {
                    full_name: specialist.full_name,
                    experience: specialist.experience,
                    photo: photoPath
                }])
            }
        })
        .catch(err => console.log(err))
    return resToSend;
}

export const getPictures = async () => {
    let resToSend = [];
    await axios.get(`${serverAddress}/api/commonPicture/get`)
        .then(res => {
            // console.log("GotPictures: ", res.data)
            resToSend = res.data;
            return resToSend;
        })
        .catch(err => console.log(err))
    return resToSend;
}