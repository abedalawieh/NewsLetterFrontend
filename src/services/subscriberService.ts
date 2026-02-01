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

  async getAllSubscribers(): Promise<SubscriberResponse[]> {
    const response = await apiClient.get<SubscriberResponse[]>("/subscribers");
    return response.data;
  },

  async getSubscriberById(id: string): Promise<SubscriberResponse> {
    const response = await apiClient.get<SubscriberResponse>(`/subscribers/${id}`);
    return response.data;
  },

  async deleteSubscriber(id: string): Promise<void> {
    await apiClient.delete(`/subscribers/${id}`);
  },

  async deactivateSubscriber(id: string): Promise<void> {
    await apiClient.patch(`/subscribers/${id}/deactivate`);
  },

  async activateSubscriber(id: string): Promise<void> {
    await apiClient.patch(`/subscribers/${id}/activate`);
  },
};

export default subscriberService;
