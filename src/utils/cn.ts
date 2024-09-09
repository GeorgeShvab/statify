const cn = (...classNames: unknown[]) => {
  return classNames
    .filter((item) => typeof item === "string" && item.trim())
    .join(" ");
};

export default cn;
