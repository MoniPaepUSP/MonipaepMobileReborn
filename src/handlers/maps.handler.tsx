import axios, { AxiosError } from "axios";
const appid = process.env.EXPO_PUBLIC_HERE_APP_ID;
const apiKey = process.env.EXPO_PUBLIC_HERE_API_KEY;

// TODO: improve this shit code

export async function getAddressFromCoordinates({
  latitude,
  longitude,
}): Promise<string> {
  try {
    const prox = `${latitude},${longitude}`;
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${prox}&lang=en-US&types=address&with=unnamedStreets&apiKey=${apiKey}`;
    const response = await axios.get(url);
    const resJson = response.data;
    const title = resJson.items[0].title;
    const addressParts = title.split(", ");

    const rua = addressParts[0] ?? "";
    const numero = addressParts[1] ?? "";
    const bairro = addressParts[2] ?? "";
    const cidade = addressParts[3] ?? "";
    const cep = addressParts[4] ?? "";
    const pais = addressParts[5] ?? "";

    const formattedAddress = [rua, numero, bairro, cidade, cep, pais]
      .filter((part) => part !== "")
      .join(", ");

    return formattedAddress;
  } catch (error) {
    if (error instanceof AxiosError) {
        console.log(error)
    }
    console.log("Error in getAddressFromCoordinates", error);
    throw error;
  }
}
