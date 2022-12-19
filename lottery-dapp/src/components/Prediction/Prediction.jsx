import "./Prediction.css";

const Prediction = () => {
  return (
    <div>
      <div className="tittle_prediction">PREDICTION</div>
      <div className="number_game_prediction"> Juego #40</div>
      <div className="line_img"></div>
      <div className="price_loked">Precio fijado: $4564532 USD</div>
      <div className="actual_pool">Pool Actual: $44532 USD</div>
      <div className="time"> Tiempo restante</div>
      <div className="countdown"> 03:23 m</div>
      <div className="up_price">Arriba 1.25X Pago</div>
      <div className="actual_price">$16.952.25</div>
      <div className="pair">BTC/USD</div>
      <div className="down_price">Abajo 1.8X Pago</div>

      <div className="user_interactive_prediction">
        <div className="btns_up_down">
          <button className="btn_up">Arriba </button>
          <input className="input_amount_prediction" placeholder="USD" />
          <button className="btn_down">Abajo </button>
        </div>
        <div className="texts_prediction">
          <div className="minimun_amount">1 USD min</div>
          <div className="user_balance">Your Balance: 42 USD</div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
