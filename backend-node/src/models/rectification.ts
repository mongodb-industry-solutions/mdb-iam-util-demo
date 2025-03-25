export interface RectificationOption {
    connection?: string;
    host?: string;
    app?: string;
    username?: string;
    password?: string;
    permissions: Array<string>;
}

export interface RectificationResponse {
    extra: string[];
    missing: string[];
    present: string[];
}