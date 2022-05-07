import axios from 'axios';



export const getPlacesData = async (type,sw, ne) => {
    try {
        const { data: {data} } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
              'X-RapidAPI-Key': '3f4ab21295mshd4f4cccd3a3b1cfp1a5003jsnb5e553cf564c'
            }
          });
          
        
        return data;
    } catch (error) {
        console.log(error)
    }
}