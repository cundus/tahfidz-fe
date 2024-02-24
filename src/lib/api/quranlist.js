import axios from "axios"

export const getSurahList = async() => {
    return (await axios.get("https://api.quran.gading.dev/surah")).data
}