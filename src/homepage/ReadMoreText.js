import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function stripHtml(input) {
  if (typeof window === "undefined") return input;
  const div = document.createElement("div");
  div.innerHTML = input;
  return div.textContent || div.innerText || "";
}

function isHtml(content) {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

function ReadMoreText({
  text,
  html,
  previewLength = 300,
  buttonPosition = "inline" // "inline" | "newline"
}) {
  const [expanded, setExpanded] = useState(false);

  const content = html ?? text ?? "";
  const containsHtml = isHtml(content);

  const plainText = stripHtml(content);
  const isLong = plainText.length > previewLength;
  const previewText = plainText.slice(0, previewLength) + "...";

  const Button = (
    <button
      onClick={() => setExpanded(!expanded)}
      className="flex items-center gap-1 text-green-600 font-medium hover:underline"
    >
      {expanded ? "Read less" : "Read more"}
      {expanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
    </button>
  );

  return (
    <div className="text-gray-700 leading-relaxed space-y-3">
      {containsHtml ? (
        <div
          dangerouslySetInnerHTML={{
            __html: expanded || !isLong ? content : `<p>${previewText}</p>`
          }}
        />
      ) : (
        <p className="inline">
          {expanded || !isLong ? content : previewText}
          {isLong && buttonPosition === "inline" && (
            <span className="ml-2 inline-flex">{Button}</span>
          )}
        </p>
      )}

      {isLong && buttonPosition === "newline" && (
        <div>{Button}</div>
      )}
    </div>
  );
}

export default ReadMoreText;
