
export const getColors = (num) => {
    switch (num) {
      case 2:
        return "#d8ff00";
      case 4:
        return "#a2f03f";
      case 8:
        return "#87e85f";
      case 16:
        return "#70e27a";
      case 32:
        return "#36d2bf";
      case 64:
        return "#00c3ff";
      case 128:
        return "#3f92e8";
      case 256:
        return "#5780df";
      case 512:
        return "#7a65d2";
      case 1024:
        return "#aa41c0";
      case 2048:
        return "#ff00a1";
      default:
        return "#bebebe";
    }
}