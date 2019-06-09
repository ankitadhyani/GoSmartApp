
// Importing ToastContainer to show alerts
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
    autoClose: 4000
});


  
// This function will trigger to show alert messages
export const showToastifyAlert = (msg, msgType) => {

    if(msgType === "success") {
        return toast.success(msg, { position: toast.POSITION.BOTTOM_CENTER });
    } 
    else if(msgType === "info") {
        return toast.info(msg, { position: toast.POSITION.BOTTOM_CENTER });
    } 
    else { // msgType === "error"
        return toast.error(msg, {  position: toast.POSITION.BOTTOM_CENTER });
    }

} // End of showToastifyAlert()