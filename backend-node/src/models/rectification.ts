export interface RectificationOption {
    connection?: string;
    host?: string;
    app?: string;
    username?: string;
    password?: string;
    permissions: Array<string>;
}

export interface RectificationX509Option extends RectificationOption {
    uri?: string;
    key?: string;
    cert?: string;
    ca?: string;
    certPath?: string;
}



export interface RectificationResponse {
    extra: string[];
    missing: string[];
    present: string[];
}