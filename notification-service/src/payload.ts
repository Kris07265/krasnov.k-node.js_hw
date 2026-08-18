export const CHANNELS = ["email", "sms", "push", "telegram"] as const;

export type Channel = (typeof CHANNELS)[number];

export type BasePayload = {
    priority: "low" | "normal" | "high";
};

export type EmailPayload = BasePayload & {
    channel: "email";
    to: string;
    subject: string;
    body: string;
    attachments?: readonly string[];
};

export type SmsPayload = BasePayload & {
    channel: "sms";
    to: string;
    text: string;
};

export type PushPayload = BasePayload & {
    channel: "push";
    deviceToken: string;
    title: string;
    body: string;
    badge?: number;
};

export type TelegramPayload = BasePayload & {
    channel: "telegram";
    chatId: string;
    text: string;
};

export type NotificationPayload =
    | EmailPayload
    | SmsPayload
    | PushPayload
    | TelegramPayload;

export function describe(payload: NotificationPayload): string {
    switch (payload.channel) {
        case "email":
            return `Email to ${payload.to}: ${payload.subject}`;

        case "sms":
            // console.log(payload.subject);
            // Property 'subject' does not exist on type 'SmsPayload'.
            return `SMS to ${payload.to}: ${payload.text}`;

        case "push":
            return `Push to ${payload.deviceToken}: ${payload.title}`;

        case "telegram":
            return `Telegram to chat ${payload.chatId}: ${payload.text}`;

        default: {
            // Type 'TelegramPayload' is not assignable to type 'never'.
            const exhaustive: never = payload;
            throw new Error(`Невідомий канал: ${JSON.stringify(exhaustive)}`);
        }
    }
}