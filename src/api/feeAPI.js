import axios from "axios";

export const addData = async (feeData) => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:8080/fee/register', feeData,
      {
        headers : {
        Authorization : token
        } 
      }
    );
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};