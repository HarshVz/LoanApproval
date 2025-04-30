import React from 'react'
import axios from 'axios'

const usePrediction = async (data) => {
    try {
        // console.log(data)
        const response = await axios.post(`https://loan-approval-prediction-w72c.onrender.com/predict`, data, {
            headers: {
            'Content-Type': 'application/json'
        }
    });
        console.log(response);
        if(response.status == 200){
            return response
        }else{
            return false
        }
    } catch (error) {
        console.error(error)
    }
}

export default usePrediction
