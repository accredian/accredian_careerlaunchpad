import api from "./server";

export const careerLaunchpad = async ({ body }) => {
  try {
    for (let [key, value] of body.entries()) {
      if (key === "resume") {
        console.log(value);
        // console.log(`${key}: ${value}`);
      }
    }

    const data = await api.post(`/career-launchpad`, body);

    return data;
  } catch (error) {
    throw error;
  }
};

export const checkUser = async ({ email }) => {
  try {
    const data = await api.post(`/career-launchpad/check-user`, {
      email,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
