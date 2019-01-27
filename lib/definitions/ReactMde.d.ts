import * as React from "react";
import { Command, GenerateMarkdownPreview, ButtonContentOptions, CommandGroup } from "./types";
import { EditorProps, EditorState } from "draft-js";
import { MdeEditor, MdePreview } from "./components";
import { Tab } from "./types/Tab";
import { L18n } from "./types/L18n";
export interface ReactMdeProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    commands?: CommandGroup[];
    generateMarkdownPreview: GenerateMarkdownPreview;
    buttonContentOptions?: ButtonContentOptions;
    emptyPreviewHtml?: string;
    readOnly?: boolean;
    draftEditorProps?: Partial<EditorProps>;
    l18n?: L18n;
    minEditorHeight: number;
    maxEditorHeight: number;
    minPreviewHeight: number;
}
export interface ReactMdeState {
    currentTab: Tab;
    previewLoading: boolean;
    previewHtml?: string;
    editorHeight: number;
}
export declare class ReactMde extends React.Component<ReactMdeProps, ReactMdeState> {
    cachedDraftState: EditorState;
    cachedValue: string;
    editorRef: MdeEditor;
    previewRef: MdePreview;
    gripDrag: {
        originalDragY: number;
        originalHeight: number;
    };
    keyCommandMap: {
        [key: string]: Command;
    };
    static defaultProps: Partial<ReactMdeProps>;
    constructor(props: ReactMdeProps);
    rebuildCache: (value: string) => void;
    handleTextChange: (editorState: EditorState) => void;
    handleGripMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleGripMouseUp: () => void;
    handleGripMouseMove: (event: MouseEvent) => void;
    handleTabChange: (newTab: Tab) => void;
    componentDidMount(): void;
    handleCommand: (command: Command) => void;
    componentDidUpdate(prevProps: ReactMdeProps): void;
    handleKeyCommand: (command: string) => "handled" | "not-handled";
    render(): JSX.Element;
}
//# sourceMappingURL=ReactMde.d.ts.map