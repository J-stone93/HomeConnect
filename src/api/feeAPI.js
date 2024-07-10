import axios from "axios";

export const addData = async (formData) => {
  try {
    console.log(formData);
    const token = localStorage.getItem('token')
    const response = await axios.post('http://localhost:8080/fee/register', 
    {
      "month" : formData.month,
      "userId": formData.userId,
      "water" : formData.water,
      "electric" : formData.electric,
      "maintenance" : formData.maintenance
    },
      {
        headers : {
        Authorization : token
        } 
      }
    );
    console.log(formData);
    // console.log(response);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};