import axios from "axios";

export default axios.create({ baseURL: "http://ec2-3-21-236-238.us-east-2.compute.amazonaws.com/api/" });
// export default axios.create({ baseURL: "http://localhost:3001/api/" });
