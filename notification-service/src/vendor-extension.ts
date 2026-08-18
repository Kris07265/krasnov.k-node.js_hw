import { User } from "./domain.js";

declare global {
    namespace VendorSDK {
        interface Context {
            user?: User;
        }
    }
}

export function processVendorContext(ctx: VendorSDK.Context): void {
    console.log(`[Vendor SDK] Processing Request ID: ${ctx.requestId}`);

    if (ctx.user) {
        console.log(`[Vendor SDK] Associated User Email: ${ctx.user.email}`);
    } else {
        console.log("[Vendor SDK] Anonymous Request (No User)");
    }
}