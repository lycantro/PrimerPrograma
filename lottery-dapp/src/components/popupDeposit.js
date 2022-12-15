const open = document.getElementById("open");
const modal_container = document.getElementById("modal_container");
const close = document.getElementById("close");

open.addEventListener("click", () => {
  modal_container.classList.add("show");
});

close.addEventListener("click", () => {
  modal_container.classList.remove("show");
});

/*import { useEffect, useState } from "react";

const PopUp = () => {
  const [openPop, setOpen] = useState(null);
  const [closePop, setClose] = useState(null);

  const open = document.getElementById("open");
  const modal_container = document.getElementById("modal_container");
  const close = document.getElementById("close");

  useEffect(() => {
    openPopup();
    closePopup();
  }, [open, modal_container, close]);

  const openPopup = () => {
    setOpen(
      open.addEventListener("click", () => {
        modal_container.classList.add("show");
      })
    );
    return openPop;
  };

  const closePopup = () => {
    setClose(
      close.addEventListener("click", () => {
        modal_container.classList.remove("show");
      })
    );
    return closePop;
  };
};

export default PopUp;*/
