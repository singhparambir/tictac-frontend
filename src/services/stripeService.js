const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const createCheckoutSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/checkout/create-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Stripe service error:", error);
    throw error;
  }
};
