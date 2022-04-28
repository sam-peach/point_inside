import React, { ReactNode } from "react";

const flexStyle = (auxStyles: {}) => ({
  display: "flex",
  margin: "auto",
  ...auxStyles,
});

const Box = ({
  children,
  style = {},
}: {
  children: ReactNode;
  style: {};
}): JSX.Element => {
  return <div style={flexStyle(style)}>{children}</div>;
};

export default Box;
