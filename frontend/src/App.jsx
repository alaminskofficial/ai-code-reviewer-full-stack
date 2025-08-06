import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    const response = await axios.post("http://localhost:3001/ai/get-response", {
      code,
    });
    setReview(typeof response.data === "string" ? response.data : response.data.review || "");
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeText = String(children).replace(/\n$/, "");

      if (inline) {
        return <code className={className} {...props}>{children}</code>;
      }

      return (
        <div style={{ position: "relative" }}>
          <pre className={className} {...props} style={{ margin: 0, paddingTop: "2.5rem" }}>
            <button
              onClick={() => copyToClipboard(codeText)}
              style={{
                position: "absolute",
                top: "0.3rem",
                right: "0.3rem",
                padding: "0.3rem 0.6rem",
                fontSize: "0.75rem",
                cursor: "pointer",
                borderRadius: "0.3rem",
                border: "none",
                backgroundColor: "#4a90e2",
                color: "white",
                zIndex: 10,
              }}
            >
              📋
            </button>
            <code className={className}>{children}</code>
          </pre>
        </div>
      );
    },
  };

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            Review
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]} components={components}>
            {review}
          </Markdown>
        </div>
      </main>
    </>
  );
}

export default App;