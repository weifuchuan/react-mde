import * as React from "react";
import { Editor, EditorState, EditorProps, DraftHandleValue } from "draft-js";
export interface MdeEditorProps {
    className?: string;
    onChange: (value: EditorState) => void;
    editorRef?: (ref: MdeEditor) => void;
    editorState: EditorState;
    readOnly: boolean;
    draftEditorProps: Partial<EditorProps>;
    handleKeyCommand: (command: string, editorState: EditorState) => DraftHandleValue;
    height: number;
}
export declare class MdeEditor extends React.Component<MdeEditorProps, {}> {
    editorRef: Editor;
    handleOnChange: (editorState: EditorState) => void;
    handleTab: (event: any) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=MdeEditor.d.ts.map