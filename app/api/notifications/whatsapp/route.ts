import { env } from "cloudflare:workers";

interface WhatsAppRequest {
  ownerName?: string;
  taskName?: string;
  dueDate?: string;
  message?: string;
}

interface WhatsAppEnvironment {
  WHATSAPP_PROVIDER?: string;
  WHATSAPP_TO?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_WHATSAPP_FROM?: string;
  TWILIO_MESSAGING_SERVICE_SID?: string;
  TWILIO_WHATSAPP_CONTENT_SID?: string;
  TWILIO_WHATSAPP_TO?: string;
  META_WHATSAPP_ACCESS_TOKEN?: string;
  META_WHATSAPP_PHONE_NUMBER_ID?: string;
  META_WHATSAPP_TEMPLATE_NAME?: string;
  META_WHATSAPP_TEMPLATE_LANGUAGE?: string;
  META_WHATSAPP_GRAPH_VERSION?: string;
  META_WHATSAPP_TO?: string;
}

interface MessageData {
  ownerName: string;
  taskName: string;
  dueDate: string;
  message: string;
}

const clean = (value: unknown, maxLength: number) =>
  String(value ?? "").trim().slice(0, maxLength);

const digits = (value: string) => value.replace(/\D/g, "");

const whatsappAddress = (value: string) => {
  const number = value.replace(/[^\d+]/g, "");
  return `whatsapp:${number.startsWith("+") ? number : `+${number}`}`;
};

async function sendWithTwilio(runtime: WhatsAppEnvironment, data: MessageData) {
  const accountSid = runtime.TWILIO_ACCOUNT_SID;
  const authToken = runtime.TWILIO_AUTH_TOKEN;
  const from = runtime.TWILIO_WHATSAPP_FROM;
  const messagingServiceSid = runtime.TWILIO_MESSAGING_SERVICE_SID;
  const contentSid = runtime.TWILIO_WHATSAPP_CONTENT_SID;
  const to = runtime.TWILIO_WHATSAPP_TO || runtime.WHATSAPP_TO || "+917045706453";

  if (!accountSid || !authToken || !contentSid || (!from && !messagingServiceSid)) {
    throw new Error(
      "Twilio WhatsApp is not configured. Add the credentials, sender or Messaging Service, and approved Content Template SID.",
    );
  }

  const params = new URLSearchParams({
    To: whatsappAddress(to),
    ContentSid: contentSid,
    ContentVariables: JSON.stringify({
      "1": data.ownerName,
      "2": data.taskName,
      "3": data.dueDate,
      "4": data.message,
    }),
  });
  if (messagingServiceSid) params.set("MessagingServiceSid", messagingServiceSid);
  else if (from) params.set("From", whatsappAddress(from));

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${accountSid}:${authToken}`)}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: params,
    },
  );
  const result = (await response.json().catch(() => ({}))) as {
    sid?: string;
    status?: string;
    message?: string;
  };
  if (!response.ok) throw new Error(result.message || "Twilio WhatsApp delivery failed.");

  const status = result.status || "accepted";
  return {
    delivered: ["delivered", "read"].includes(status.toLowerCase()),
    provider: "twilio",
    messageId: result.sid,
    status,
  };
}

async function sendWithMeta(runtime: WhatsAppEnvironment, data: MessageData) {
  const accessToken = runtime.META_WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = runtime.META_WHATSAPP_PHONE_NUMBER_ID;
  const templateName = runtime.META_WHATSAPP_TEMPLATE_NAME;
  const graphVersion = runtime.META_WHATSAPP_GRAPH_VERSION;
  const language = runtime.META_WHATSAPP_TEMPLATE_LANGUAGE || "en_US";
  const to = runtime.META_WHATSAPP_TO || runtime.WHATSAPP_TO || "+917045706453";

  if (!accessToken || !phoneNumberId || !templateName || !graphVersion) {
    throw new Error(
      "Meta WhatsApp is not configured. Add the access token, phone-number ID, template name, and Graph API version.",
    );
  }

  const response = await fetch(
    `https://graph.facebook.com/${encodeURIComponent(graphVersion)}/${encodeURIComponent(phoneNumberId)}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: digits(to),
        type: "template",
        template: {
          name: templateName,
          language: { code: language },
          components: [{
            type: "body",
            parameters: [data.ownerName, data.taskName, data.dueDate, data.message]
              .map((text) => ({ type: "text", text })),
          }],
        },
      }),
    },
  );
  const result = (await response.json().catch(() => ({}))) as {
    messages?: Array<{ id?: string }>;
    error?: { message?: string; error_user_msg?: string };
  };
  if (!response.ok) {
    throw new Error(
      result.error?.error_user_msg || result.error?.message || "Meta WhatsApp delivery failed.",
    );
  }

  return {
    delivered: false,
    provider: "meta",
    messageId: result.messages?.[0]?.id,
    status: "accepted",
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WhatsAppRequest;
    const data: MessageData = {
      ownerName: clean(body.ownerName, 100),
      taskName: clean(body.taskName, 200),
      dueDate: clean(body.dueDate, 30),
      message: clean(body.message, 500) || "Please review this task and update its status.",
    };
    if (!data.ownerName || !data.taskName || !data.dueDate) {
      return Response.json(
        { error: "Task owner, task name, and due date are required." },
        { status: 400 },
      );
    }

    const runtime = env as unknown as WhatsAppEnvironment;
    const provider = (runtime.WHATSAPP_PROVIDER || "twilio").trim().toLowerCase();
    if (!(["twilio", "meta"] as string[]).includes(provider)) {
      return Response.json(
        { error: "WHATSAPP_PROVIDER must be either `twilio` or `meta`." },
        { status: 503 },
      );
    }

    const result = provider === "meta"
      ? await sendWithMeta(runtime, data)
      : await sendWithTwilio(runtime, data);
    return Response.json(result);
  } catch (error) {
    console.error("WhatsApp delivery failed", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "WhatsApp delivery failed." },
      { status: 502 },
    );
  }
}
