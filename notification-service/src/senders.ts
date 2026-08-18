import { NotificationPayload, Channel } from "./payload.js";

export type SendResult =
    | { ok: true; messageId: string; sentAt: Date }
    | { ok: false; error: string; retryable: boolean };

export interface Sender {
    (payload: NotificationPayload): Promise<SendResult>;
    readonly channel: Channel;
    isAvailable(): boolean;
}

export interface SendLogger {
    (result: SendResult): void;
}

export const emailSender: Sender = Object.assign(
    async (payload: NotificationPayload): Promise<SendResult> => {
        console.log(`[EmailSender] Sending payload to ${payload.channel}...`);
        return { ok: true, messageId: "msg-email-123", sentAt: new Date() };
    },
    {
        channel: "email" as const,
        isAvailable: () => true,
    }
);

export const smsSender: Sender = Object.assign(
    async (payload: NotificationPayload): Promise<SendResult> => {
        console.log(`[SmsSender] Sending payload to ${payload.channel}...`);
        return { ok: true, messageId: "msg-sms-456", sentAt: new Date() };
    },
    {
        channel: "sms" as const,
        isAvailable: () => true,
    }
);

export const pushSender: Sender = Object.assign(
    async (payload: NotificationPayload): Promise<SendResult> => {
        console.log(`[PushSender] Sending payload to ${payload.channel}...`);
        return { ok: false, error: "Device token expired", retryable: false };
    },
    {
        channel: "push" as const,
        isAvailable: () => false,
    }
);

export async function sendWithLogging(
    payload: NotificationPayload,
    sender: Sender,
    logger: SendLogger
): Promise<SendResult> {
    if (!sender.isAvailable()) {
        const errorResult: SendResult = {
            ok: false,
            error: `Sender for channel ${sender.channel} is currently unavailable`,
            retryable: true,
        };
        logger(errorResult);
        return errorResult;
    }

    const result = await sender(payload);
    logger(result);
    return result;
}

export const consoleLogger: SendLogger = (result: SendResult): void => {
    if (result.ok) {
        console.log(`[LOG Success] Sent! Message ID: ${result.messageId} at ${result.sentAt.toISOString()}`);
    } else {
        console.log(`[LOG Failure] Error: ${result.error} (Retryable: ${result.retryable})`);
    }
};