const Button = ({ content, handleClick, children }) => {
  return <button onClick={handleClick}>{children}</button>;
};
export { Button };
