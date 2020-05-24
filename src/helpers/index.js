"use strict";

export const clipIt = (inputId) => {
  const node = document.querySelector("#" + inputId);
  node.select();
  node.setSelectionRange(0, 99999);
  document.execCommand("copy");
  return node.value;
} 