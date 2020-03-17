import React, { useEffect } from "react";

export default function AutoComplete(props) {
  var suggestUl;
  const called = e => {
    document.getElementById("auto-suggest-game").value = e.target.innerText;
    suggestUl.innerHTML = "";
  };
  useEffect(() => {
    suggestUl = document.getElementById("suggest-ul-id");
  });
  useEffect(() => {
    if (props.values.length !== 0) {
      suggestUl.innerHTML = "";
    }
  }, [props.values]);
  const SuggestHandler = e => {
    suggestUl.innerHTML = "";
    if (e.target.value !== "") {
      suggestUl.style.width =
        document.getElementById("auto-suggest-game").clientWidth + "px";
      var li = document.createElement("li");
      li.setAttribute("class", "suggest-li");
      li.onclick = called;
      if (props.values.length !== 0) {
        props.values.forEach(element => {
          if (
            element.name
              .toLowerCase()
              .trim()
              .includes(e.target.value)
          ) {
            li.innerText = element.name;
            li.id = element.id;
            suggestUl.appendChild(li);
          }
        });
      } else {
        li.innerText = "Fetching...";
        suggestUl.appendChild(li);
      }
    }
  };

  return (
    <div className="suggest-root">
      <input
        className="form-control"
        id="auto-suggest-game"
        onChange={e => SuggestHandler(e)}
      />
      <ul className="suggest-ul" id="suggest-ul-id"></ul>
    </div>
  );
}
