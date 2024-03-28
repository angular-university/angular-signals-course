export type MessageSeverity = "error" | "warning" | "info" | "success";

export type Message = {
  severity: MessageSeverity;
  text: string;
}

