"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var draft_js_1 = require("draft-js");
function getContentLengthOfAllBlocksBefore(editorState, key) {
    var count = 0;
    var blockBefore;
    var currentKey = key;
    while (true) {
        blockBefore = editorState.getCurrentContent().getBlockBefore(currentKey);
        if (!blockBefore) {
            break;
        }
        // we have to add 1 here to account for the \n character
        count += blockBefore.getText().length + 1;
        currentKey = blockBefore.getKey();
    }
    return count;
}
exports.getContentLengthOfAllBlocksBefore = getContentLengthOfAllBlocksBefore;
function getSelection(editorState) {
    var selection = editorState.getSelection();
    var startKey = selection.getStartKey();
    var startOffset = selection.getStartOffset();
    var endKey = selection.getEndKey();
    var endOffset = selection.getEndOffset();
    var editorWiseOffset = getContentLengthOfAllBlocksBefore(editorState, startKey);
    var offsetBetweenKeys = getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset);
    // start and end are on the same block
    return {
        start: startOffset + editorWiseOffset,
        end: startOffset + offsetBetweenKeys + editorWiseOffset
    };
}
exports.getSelection = getSelection;
function getContentLengthBetween(editorState, startKey, startOffset, endKey, endOffset) {
    if (startKey === endKey) {
        return endOffset - startOffset;
    }
    var count = editorState
        .getCurrentContent()
        .getBlockForKey(startKey)
        .getText().length - startOffset;
    var blockAfter;
    var currentKey = startKey;
    while (true) {
        blockAfter = editorState.getCurrentContent().getBlockAfter(currentKey);
        if (!blockAfter || blockAfter.getKey() === endKey) {
            break;
        }
        // we have to add 1 here to account for the \n character
        count += blockAfter.getText().length + 1;
        currentKey = blockAfter.getKey();
    }
    // we have to add 1 here to account for the \n character
    count += endOffset + 1;
    return count;
}
exports.getContentLengthBetween = getContentLengthBetween;
function getPlainText(editorState) {
    return editorState.getCurrentContent().getPlainText("\n");
}
exports.getPlainText = getPlainText;
var findBlockKeyAndOffsetForPosition = function (position, block, globalOffset, blockOffset, contentState) {
    if (!block || position < globalOffset + blockOffset) {
        return null;
    }
    if (position > globalOffset + block.getText().length) {
        // the princess is in another castle
        return findBlockKeyAndOffsetForPosition(position, contentState.getBlockAfter(block.getKey()), globalOffset + block.getText().length + 1, 0, contentState);
    }
    else {
        // the princess is in this castle
        return {
            block: block,
            globalOffset: globalOffset,
            blockOffset: position - globalOffset
        };
    }
};
function buildSelectionState(contentState, selection) {
    var firstBlock = contentState.getFirstBlock();
    if (firstBlock === null) {
        return null;
    }
    var startBlockData = findBlockKeyAndOffsetForPosition(selection.start, firstBlock, 0, 0, contentState);
    if (startBlockData === null) {
        return null;
    }
    var endBlockData = findBlockKeyAndOffsetForPosition(selection.end, startBlockData.block, startBlockData.globalOffset, startBlockData.blockOffset, contentState);
    if (endBlockData === null) {
        return null;
    }
    var selectionState = draft_js_1.SelectionState.createEmpty(startBlockData.block.getKey());
    return selectionState.merge({
        anchorKey: startBlockData.block.getKey(),
        anchorOffset: startBlockData.blockOffset,
        focusKey: endBlockData.block.getKey(),
        focusOffset: endBlockData.blockOffset
    });
}
exports.buildSelectionState = buildSelectionState;
function getMarkdownStateFromDraftState(editorState) {
    return {
        text: getPlainText(editorState),
        selection: getSelection(editorState)
    };
}
exports.getMarkdownStateFromDraftState = getMarkdownStateFromDraftState;
function buildNewDraftState(currentState, markdownState) {
    var text = markdownState.text, selection = markdownState.selection;
    // TODO: Fix the redo. It's no working properly but this is an implementation detail.
    // handling text change history push
    var contentState = draft_js_1.ContentState.createFromText(text);
    var state = draft_js_1.EditorState.forceSelection(currentState, currentState.getSelection());
    state = draft_js_1.EditorState.push(state, contentState, "insert-characters");
    // handling text selection history push
    var selectionState = selection
        ? buildSelectionState(state.getCurrentContent(), selection)
        : currentState.getSelection();
    return draft_js_1.EditorState.forceSelection(state, selectionState);
}
exports.buildNewDraftState = buildNewDraftState;
