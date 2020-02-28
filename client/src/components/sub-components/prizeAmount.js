import React, { useState, useEffect } from "react";

export default function PrizeAmount(props) {
  const [amount, setAmount] = useState(props.amount);
  useEffect(() => {
    setAmount(props.amount);
  }, [props.amount]);

  const SliderChangeHandler = e => {
    setAmount(e.target.value);
  };
  return (
    <div class="form-group">
      <label>Rank {props.rank}</label>
      <div class="d-flex justify-content-center align-items-center">
        <input
          class="custom-range"
          type="range"
          value={amount}
          min={props.min}
          max={props.max}
          onChange={SliderChangeHandler}
        />
        <input
          class="form-control"
          type="number"
          value={amount}
          onChange={SliderChangeHandler}
        />
      </div>
    </div>
  );
}
