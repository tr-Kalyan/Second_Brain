import axios from 'axios'
import {Request,Response} from "express"



export const getThumbnail = async (url: string): Promise<string | null> => {
    try {
        const response = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        return response.data?.data?.image?.url ?? null
    } catch (err) {
        console.error("Thumbnail fetch failed:", err);
        return null;
    }
};