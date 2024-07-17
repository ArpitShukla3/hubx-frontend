import axios from "axios";
import { apiImageView } from "../../apiList";
import toast from "react-hot-toast";

let isExecuting = false;

async function update(parameters) {
 try {
    const { _id, views } = parameters;
    await axios.post(apiImageView, { id: _id, views: views + 1 });
 } catch (error) {
    toast.dismiss()
    toast.error(error.message)
 }
}
 

export default update;
