import apiClient from "./apiClient";
import type {
  CreateSubscriberDto,
  SubscriberResponse
} from "@/types";

export const subscriberService = {
  async createSubscriber(data: CreateSubscriberDto): Promise<SubscriberResponse> {
    const response = await apiClient.post<SubscriberResponse>("/subscribers", data);
    return response.data;
  },
};

export default subscriberService;
