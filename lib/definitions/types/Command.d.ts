import * as React from "react";
import { EditorState } from "draft-js";
export interface ButtonContentOptions {
    iconProvider: (iconName: string) => React.ReactNode;
}
export declare type ButtonContentBuilder = (options: ButtonContentOptions) => React.ReactNode;
export interface Command {
    buttonComponentClass?: React.ComponentClass | string;
    buttonContentBuilder: ButtonContentBuilder;
    buttonProps?: any;
    children?: Command[];
    execute?: (EditorState: any, data?: any) => EditorState;
    keyCommand?: string;
}
//# sourceMappingURL=Command.d.ts.map