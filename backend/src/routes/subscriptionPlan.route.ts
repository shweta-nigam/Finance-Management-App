import { createSubscriptionPlan, deleteAllSubscriptionPlans, deleteSubscriptionPlan, getAllSubscriptionPlan, getSubscriptionPlan, updateSubscriptionPlan } from "../controllers/subscriptionPlan.controller"
import { isLoggedIn } from "../middlewares/auth.middleware"
import express from "express"
const subscriptionPlanRoute = express.Router()

subscriptionPlanRoute.post("/", isLoggedIn, createSubscriptionPlan)
subscriptionPlanRoute.patch("/:subscriptionPlanId", isLoggedIn, updateSubscriptionPlan)
subscriptionPlanRoute.get("/:subscriptionPlanId", isLoggedIn, getSubscriptionPlan)
subscriptionPlanRoute.get("/", isLoggedIn, getAllSubscriptionPlan)
subscriptionPlanRoute.delete("/:subscriptionPlanId", isLoggedIn, deleteSubscriptionPlan)
subscriptionPlanRoute.delete("/", isLoggedIn, deleteAllSubscriptionPlans)

export default subscriptionPlanRoute