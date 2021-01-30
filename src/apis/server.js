import axios from "axios";

let baseURL = process.env.REACT_APP_SERVER_API_URL || "http://ec2-3-21-236-238.us-east-2.compute.amazonaws.com/api/"
export default axios.create({ baseURL: baseURL });
