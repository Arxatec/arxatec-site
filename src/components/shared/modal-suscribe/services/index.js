import axios from "axios";

export const subscriptionService = {
  create: async (email, name) => {
    try {
      const response = await axios.post(
        "https://arxatec-service-production.up.railway.app/api/v1/waitlist",
        { email, name }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return error.response.status;
    }
  },
};
