import Swal from "sweetalert2";

export const handleError = (error, type = "error", callback) => {
  // Check if error.response exists and has the required properties
  if (error.response && error.response.data && error.response.data.message) {
    Swal.fire({
      title: error.response.data.message,
      text: error.response.data.feedback,
      icon: type,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed && typeof callback === "function") {
        callback();
      }
    });
  } else {
    // Default error message
    Swal.fire({
      title: "Oops!",
      text: "Apologies, we are currently experiencing some server issues. Please try again later.",
      icon: type,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed && typeof callback === "function") {
        callback();
      }
    });
  }
};
