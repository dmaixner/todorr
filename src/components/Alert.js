import { ALERT } from "../consts";

function Alert({ text, style, setAlert }) {
  if (text) {
    let styleClass = "";
    if (style === ALERT.WARNING) {
      styleClass = "is-warning";
    } else if (style === ALERT.ERROR) {
      styleClass = "is-danger";
    }
    return (
      <div className={"message is-light " + styleClass}>
        <div className={"message-body is-light has-text-centered " + styleClass}>
          <button className="delete is-pulled-right" title="close alert" onClick={() => setAlert(null, ALERT.WARNING)}></button>
          {text}
        </div>
      </div>
    )
  } else {
    return null;
  }
}

export default Alert;
