import apiClient from "./apiClient";
import type {
  CreateSubscriberDto,
  SubscriberResponse,
  ReactivationResponse
} from "@/types";

export const subscriberService = {
  async createSubscriber(data: CreateSubscriberDto): Promise<SubscriberResponse | ReactivationResponse> {
    const response = await apiClient.post<SubscriberResponse | ReactivationResponse>("/subscribers", data);
    return response.data;
  },
};

export default subscriberService;
