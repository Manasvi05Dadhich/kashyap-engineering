"use client";

import { useEffect, useRef } from "react";

type SummernoteEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onImageUpload: (file: File) => Promise<string>;
  onError: (message: string) => void;
};

type SummernoteJQuery = {
  summernote: (...args: unknown[]) => unknown;
};

export default function SummernoteEditor({ value, onChange, onImageUpload, onError }: SummernoteEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialValueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  const onImageUploadRef = useRef(onImageUpload);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onChangeRef.current = onChange;
    onImageUploadRef.current = onImageUpload;
    onErrorRef.current = onError;
  }, [onChange, onImageUpload, onError]);

  useEffect(() => {
    let destroyed = false;
    let editor: SummernoteJQuery | undefined;

    async function initialize() {
      const jqueryModule = await import("jquery");
      const $ = jqueryModule.default;
      (window as typeof window & { $?: typeof $; jQuery?: typeof $ }).$ = $;
      (window as typeof window & { $?: typeof $; jQuery?: typeof $ }).jQuery = $;
      // Summernote ships this browser-only bundle without a usable subpath declaration.
      // @ts-expect-error The module is loaded dynamically in the browser.
      await import("summernote/dist/summernote-lite.js");

      if (destroyed || !textareaRef.current) return;

      editor = $(textareaRef.current) as unknown as SummernoteJQuery;
      editor.summernote({
        height: 300,
        placeholder: "Write your blog content here...",
        toolbar: [
          ["style", ["style"]],
          ["font", ["bold", "underline", "italic", "clear"]],
          ["fontname", ["fontname"]],
          ["color", ["color"]],
          ["para", ["ul", "ol", "paragraph"]],
          ["table", ["table"]],
          ["insert", ["link", "picture", "video"]],
          ["view", ["fullscreen", "codeview", "help"]],
        ],
        callbacks: {
          onChange: (html: string) => onChangeRef.current(html),
          onImageUpload: async (files: File[]) => {
            try {
              for (const file of files) {
                const url = await onImageUploadRef.current(file);
                editor?.summernote("insertImage", url, "$image");
              }
            } catch (uploadError) {
              onErrorRef.current(uploadError instanceof Error ? uploadError.message : "Image upload failed");
            }
          },
        },
      });
      editor.summernote("code", initialValueRef.current);
    }

    void initialize();

    return () => {
      destroyed = true;
      editor?.summernote("destroy");
    };
  }, []);

  return <textarea ref={textareaRef} defaultValue={value} aria-label="Description" />;
}