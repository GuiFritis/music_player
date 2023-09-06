import axios from "axios";
import { reducerCases } from "./Constants";
import { useStateProvider } from "./StateProvider";

const setDevice = async (token, disppatch) => {
    const response = await axios.get('https://api.spotify.com/v1/me/player/devices', {
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    
    if(response.data) {
        const device = response.data.devices[0];
        const currentDevice = {
            id: device.id,
            name: device.name,
            volume_percent: device.volume_percent,
        }
        disppatch({type: reducerCases.SET_CURRENT_DEVICE, currentDevice});
    }
};

export default setDevice;