import axios from "axios"
import { useState } from "react"



export function useAuth() {

}

axios.get("api/v1/http://localhost:3000")
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })