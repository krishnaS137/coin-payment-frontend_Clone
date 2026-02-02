import React from "react";

const InfinityCards = ({ image, content }: { image: string; content: string }) => {
  return (
    <div
      className="
        w-72              /* FIXED WIDTH */
        flex-shrink-0
        text-white
        rounded-3xl
        shadow-[5px_5px_20px_0_rgba(0,0,0,0.1)]
        p-5
        bg-blue-400
      "
    >
      <div className="flex items-start gap-3">
        <img
          src={image}
          alt="Image"
          className="rounded-full size-10 object-cover"
        />
        <p className="text-sm leading-relaxed break-words">
          {content}
        </p>
      </div>
    </div>
  )
}

export default InfinityCards