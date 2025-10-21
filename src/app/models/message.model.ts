export type MessageSeverity = "error" | "warning" | "info" | "success" | (string & {});

export type Message = {
  severity: MessageSeverity;
  text: string;
}

const teste: MessageSeverity = '';

