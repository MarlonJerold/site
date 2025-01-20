'use client';

import { CopyBlock, monokai } from 'react-code-blocks';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  return (
    <div className="prose">
      <CopyBlock
        text={code}
        language={language}
        showLineNumbers={false}
        theme={monokai}
        codeBlock
      />
    </div>
  );
};

export default CodeBlock;