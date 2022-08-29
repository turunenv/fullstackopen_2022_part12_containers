import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const { message, style } = notification;

  let notificationStyle = { display: "none" };

  const errorMessageStyle = {
    color: "red",
    backgroundColor: "#d9d9d9",
    border: "2px solid red",
    width: "25%",
    borderRadius: "3",
    padding: 5,
    fontSize: 20,
    marginBottom: 5,
  };

  const successMessageStyle = {
    color: "green",
    backgroundColor: "#d9d9d9",
    border: "2px solid green",
    width: "25%",
    borderRadius: "3",
    padding: 5,
    fontSize: 20,
    marginBottom: 5,
  };

  if (style === "success") {
    notificationStyle = successMessageStyle;
  } else if (style === "error") {
    notificationStyle = errorMessageStyle;
  }

  if (message) {
    return <div style={notificationStyle}>{message}</div>;
  }
  return null;
};

export default Notification;
