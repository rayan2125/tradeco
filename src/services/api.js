import axios from 'axios';




import { API_CONSTANTS } from '../constants/ApiCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',

  }
}



function getBaseUrl() {
  return API_CONSTANTS.BASE_URL;;
}

function getToken() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token').then(token => {
      resolve(token)
    })
  });
}





async function callAxios(endPoint, reqData, auth = true) {
  
  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);

    const authtoken = auth ? 'Bearer ' + token : "";

    const response = await axios.post(
      baseUrl + endPoint,

      { ...reqData },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authtoken
        }
      },

    );

    if (response.data.access_token) {
      return { success: true, data: response.data, message: response.data.message };
    } if (response.data.aaData) {
      return { success: true, data: response.data };
    } else if (response.data.status === "success") {
      return { success: true, data: response.data, message: response.data.message };
    } else {
      return { success: true, data: response.data, message: response.data.message };
    }
  } catch (error) {

    if (error?.response) {
      if (error?.response?.status === 302) {
        return {
          success: true,
          data: error.response.data,
        };
      } else {
        return {
          success: false,
          data: {
            message: error.response.data?.message || 'Some Error occurred!',
            error: error.response,
          },
        };
      }
    } else {
      // Handle network or other errors
      return {
        success: false,
        data: {
          message: 'Network error or invalid response!',
          error,
        },
      };
    }

  }
}
async function callAxiosImage(endPoint, reqData, auth = true) {

  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);
    const authtoken = auth ? 'Bearer ' + token : "";

    // Create a FormData object and append the fields from reqData
    const formData = new FormData();
    reqData._parts.forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(
      baseUrl + endPoint,
      formData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': authtoken
        }
      }
    );

    if (response.data.access_token) {
      return { success: true, data: response.data, message: response.data.message };
    } else if (response.data.aaData) {
      return { success: true, data: response.data };
    } else if (response.data.status === "success") {
      return { success: true, data: response.data, message: response.data.message };
    } else {
      return { success: true, data: response.data, message: response.data.message };
    }
  } catch (error) {
   

    return {
      success: false,
      data: {
        message: 'Some Error occurred!',
        error: error.response
      }
    };
  }
}





async function callAxiosGet(endPoint, auth = true) {

  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);
    const authtoken = auth ? 'Bearer ' + token : "";
    const response = await axios.get(
      baseUrl + endPoint,

      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authtoken
        }
      }
    );

    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {
   
    return {
      success: false, data: {
        message: 'Some Error occurred!',
        error: error
      }
    };
  }
}




async function callAxiosPaymet(reqData) {

  try {
    const baseUrl = await getBaseUrl();

    const response = await axios.post(
      baseUrl,
      reqData,  // Corrected the way reqData is passed
      {
        headers: {
          'Content-Type': 'application/json',

        }
      }
    );

    if (response.data.status === "success") {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {

    return { success: false, data: 'Some Error occurred!' };
  }

}

// async function call
async function callAxiosPatch(endPoint, reqData, auth = true) {
  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);
    const authtoken = auth ? 'Bearer ' + token : "";

    const response = await axios.patch(
      baseUrl + endPoint,
      { reqData },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authtoken
        }
      },
    );

    if (response.data.access_token) {
      return { success: true, data: response.data, message: response.data.message };
    } else if (response.data.aaData) {
      return { success: true, data: response.data };
    } else if (response.data.status === "success") {
      return { success: true, data: response.data, message: response.data.message };
    } else {
      return { success: false, data: response.data, message: response.data.message };
    }
  } catch (error) {
    return {
      success: false,
      data: {
        message: 'Some Error occurred!',
        error: error.response
      }
    };
  }
}
async function callAxiosDelete(endPoint, auth = true) {
  try {
    const [baseUrl, token] = await Promise.all([getBaseUrl(), getToken()]);
    const authtoken = auth ? 'Bearer ' + token : "";

    const response = await axios.delete(
      baseUrl + endPoint,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authtoken
        }
      }
    );

    if (response.data.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, data: response.data };
    }
  } catch (error) {
    return {
      success: false,
      data: {
        message: 'Some Error occurred!',
        error: error.response
      }
    };
  }
}

export {
  callAxios,
  callAxiosImage,
  callAxiosGet,
  callAxiosPatch,
  callAxiosPaymet,
  callAxiosDelete,

};
