import { NotificationPayload, CHANNELS } from "./payload.js";

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function isPriority(value: unknown): value is "low" | "normal" | "high" {
    return value === "low" || value === "normal" || value === "high";
}

export function isNotificationPayload(value: unknown): value is NotificationPayload {
    if (!isObject(value)) return false;

    const { channel, priority } = value;

    if (!isString(channel) || !(CHANNELS as readonly string[]).includes(channel)) {
        return false;
    }

    if (!isPriority(priority)) {
        return false;
    }

    switch (channel) {
        case "email":
            return (
                isString(value["to"]) &&
                isString(value["subject"]) &&
                isString(value["body"]) &&
                (value["attachments"] === undefined || Array.isArray(value["attachments"]))
            );

        case "sms":
            return isString(value["to"]) && isString(value["text"]);

        case "push":
            return (
                isString(value["deviceToken"]) &&
                isString(value["title"]) &&
                isString(value["body"]) &&
                (value["badge"] === undefined || isNumber(value["badge"]))
            );

        case "telegram":
            return isString(value["chatId"]) && isString(value["text"]);

        default:
            return false;
    }
}

export function handleIncoming(raw: unknown): string | null {
    if (isNotificationPayload(raw)) {
        return raw.channel;
    }

    console.log("Invalid payload structure received:", raw);
    return null;
}