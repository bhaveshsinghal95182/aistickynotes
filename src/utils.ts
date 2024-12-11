export function autoGrow(textAreaRef: React.RefObject<HTMLTextAreaElement>) {
  const { current } = textAreaRef;
  if (current) {
    current.style.height = "auto"; 
    current.style.height = current.scrollHeight + "px";
  }
}

export const setNewOffset = (
  card: HTMLDivElement | null,
  mouseMoveDir = { x: 0, y: 0 }
) => {
  if (!card) return;
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const setZIndex = (selectedCard: HTMLDivElement | null) => {
  if (!selectedCard) return;

  selectedCard.style.zIndex = "999";

  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      const currentZIndex = parseInt(selectedCard.style.zIndex, 10) || 0;
      (card as HTMLDivElement).style.zIndex = (currentZIndex - 1).toString();
    }
  });
};

export const bodyParser = (value: string | object) => {
  if (typeof value === "object" && value !== null) {
    return value;
  }

  // If value is a string, try to parse it
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.log(error)
      return value;
    }
  }
  return value;
}
