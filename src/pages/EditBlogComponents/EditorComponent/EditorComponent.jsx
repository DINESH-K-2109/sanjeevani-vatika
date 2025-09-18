import React, { forwardRef } from 'react';
import JoditEditor from 'jodit-react';

const EditorComponent = forwardRef(({ content, setContent }, ref) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Content</label>
            <JoditEditor
                ref={ref}
                onChange={newContent => setContent(newContent)}
                value={content}
            />
        </div>
    );
});

export default EditorComponent;
