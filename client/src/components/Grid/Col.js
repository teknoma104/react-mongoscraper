import React from "react";

export const Col = ({ size, children, className }) => (
  <div className={[size.split(" ").map(size => "col-" + size), className].join(" ")}>
    {children}
  </div>
);
